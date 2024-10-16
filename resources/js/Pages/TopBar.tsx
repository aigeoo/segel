import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
import axios from 'axios';
import { ChevronDown, User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TopBarProps {
  currentUser: {
    name: string;
    role: 'admin' | 'user';
  };
}

const pages = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Tasks', href: '/tasks' },
  { name: 'Events', href: '/events' },
  { name: 'Companies', href: '/companies' },
  { name: 'Industries', href: '/industries' },
  { name: 'Deals', href: '/deals' },
  { name: 'Contacts', href: '/contacts' },
  { name: 'Documents', href: '/documents' },
]

export default function TopBar({ currentUser }: TopBarProps) {
    const handleLogout = (e: any) => {
        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/logout')
                .then(response => {
                    window.location.href = '/'; 
            })
        })
    };

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href='/dashboard'><img src="/images/logo.png" alt="CRM Logo" width={120} height={40} /></a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Pages
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {pages.map((page) => (
                <DropdownMenuItem key={page.name} asChild>
                  <a href={page.href}>{page.name}</a>
                </DropdownMenuItem>
              ))}
              {currentUser.role === 'admin' && (
                <DropdownMenuItem asChild>
                  <a href="/users">Users</a>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-2">
              <span className="mr-2">User Profile</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}