import React from 'react';
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  Settings,
} from "lucide-react";

const Sidebar = ({ className }) => {
  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: "text-sky-500"
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      color: "text-gray-500"
    }
  ];

  return (
    <div className={cn("fixed left-0 top-0 z-40 h-full w-64 bg-background border-r border-gray-200", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant="ghost"
                className={cn("w-full justify-start gap-x-2", 
                  window.location.pathname === route.href ? 
                  "bg-accent text-accent-foreground" : ""
                )}
                onClick={() => window.location.href = route.href}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {route.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 