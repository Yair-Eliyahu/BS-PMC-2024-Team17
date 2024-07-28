"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChartBig, CreditCard, LifeBuoy, Settings, User, UserPlus, Plus, Github} from "lucide-react"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function NavMenu() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem className="mb-2">
          <Link href="/dashboard" className="flex flex-row items-center">
            <BarChartBig className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="mb-2">
          <Link href="/profile" className="flex flex-row items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="mb-2">
          <Link href="/billing" className="flex flex-row items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="mb-2">
          <Link href="/quizz/new" className="flex flex-row items-center">
            <Plus className="mr-2 h-4 w-4" />
            <span>New Quizz</span>
          </Link>
        </DropdownMenuItem>    

      <DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="mb-2">
          <Link href="https://github.com/Yair-Eliyahu/BS-PMC-2024-Team17.git" className="flex flex-row items-center">
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuGroup>
        <DropdownMenuItem className="mb-2">
          <Link href="/Invite/" className="flex flex-row items-center">
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite Users</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuGroup>

      <DropdownMenuItem className="mb-2">
          <Link href="/settings" className="flex flex-row items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuGroup>
        <DropdownMenuItem className="mb-2">
          <Link href="/support" className="flex flex-row items-center">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      


    </DropdownMenuContent>
  )
}
