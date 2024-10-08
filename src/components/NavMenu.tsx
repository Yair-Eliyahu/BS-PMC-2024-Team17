"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import Link from "next/link";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { BarChartBig, CreditCard, LifeBuoy, User, UserPlus, Plus, Calendar} from "lucide-react"
import SwitchMode from "@/components/switchMode";

type Checked = DropdownMenuCheckboxItemProps["checked"]

type NavMenuProps = {
  session: any; // Replace with the appropriate type
  regsession: any; // Replace with the appropriate type
};

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
            <Link href="/calendar" className="flex flex-row items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
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
          <Link href="/Invite/" className="flex flex-row items-center">
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite Users</span>
          </Link>
        </DropdownMenuItem>

      <DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuGroup>

      <DropdownMenuGroup>
        <DropdownMenuItem className="mb-2">
          <Link href="/quizz/new" className="flex flex-row items-center">
            <Plus className="mr-2 h-4 w-4" />
            <span>New Quizz</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuGroup>

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
