"use client"

import Container from '@/components/container'
import React from 'react'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import Carticon from './Carticon'
import FavouriteButton from './FavouriteButton'
import SignIn from './SignIn'
import MobileMenu from './MobileMenu'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { User, LogOut } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
const Header = () => {
  const { data: session, status } = useSession()

  return (
    <header className='bg-white/70 py-5 sticky top-0 z-50 backdrop-blur-md'>
        <Container className='flex items-center justify-between text-gray-600'>
            <div className='w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0'>
              <MobileMenu/>
              <Logo/>
            </div>
            <HeaderMenu />
            <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
              <SearchBar/>
              <FavouriteButton/>
              <Carticon/>
              {status === "loading" ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt="User avatar"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-shop_orange to-shop-coralpeach flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {session.user?.name && (
                          <p className="font-medium">{session.user.name}</p>
                        )}
                        {session.user?.email && (
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {session.user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <Link href="/account">
                      <DropdownMenuItem className="cursor-pointer">
                        <span>Account</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <SignIn/>
              )}             
            </div>
        </Container>
    </header>
  )
}

export default Header