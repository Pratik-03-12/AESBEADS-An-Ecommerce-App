"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [profileMessage, setProfileMessage] = useState("")

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loadingPassword, setLoadingPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "")
      // phone will be fetched from API since session doesn't include it by default
      fetch("/api/account/profile")
        .then((r) => r.json())
        .then((data) => {
          if (data?.user?.phone) setPhone(data.user.phone)
        })
        .catch(() => {})
    }
  }, [session])

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingProfile(true)
    setProfileMessage("")
    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to update profile")
      setProfileMessage("Profile updated successfully")
    } catch (err: any) {
      setProfileMessage(err.message)
    } finally {
      setLoadingProfile(false)
    }
  }

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingPassword(true)
    setPasswordMessage("")

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match")
      setLoadingPassword(false)
      return
    }

    try {
      const res = await fetch("/api/account/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to change password")
      setPasswordMessage("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      setPasswordMessage(err.message)
    } finally {
      setLoadingPassword(false)
    }
  }

  if (status === "loading") return null

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={saveProfile} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +1 555 123 4567" />
            </div>
            {profileMessage && <p className="text-sm text-gray-600">{profileMessage}</p>}
            <Button type="submit" disabled={loadingProfile}>
              {loadingProfile ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={changePassword} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current password</Label>
              <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="newPassword">New password</Label>
              <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            {passwordMessage && <p className="text-sm text-gray-600">{passwordMessage}</p>}
            <Button type="submit" disabled={loadingPassword}>
              {loadingPassword ? "Updating..." : "Update password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
