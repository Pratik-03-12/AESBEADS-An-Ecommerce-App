
import React from 'react'
import Link from 'next/link'

const SignIn = () => {
  return (
    <Link href="/auth/signin">
      <button className='text-sm font-semibold hover:text-black text-gray-600 hover:cursor-pointer hoverEffect'>
        Login
      </button>
    </Link>
  );
}

export default SignIn