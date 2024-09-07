import { Avatar, AvatarImage, AvatarFallback } from  "@/components/ui/avatar";


export default function SideNavbar () {
    return (
        <aside className="w-1/5 border-r p-4 flex flex-col justify-between">
            <div className="space-y-4">
                <div className="font-bold">Creative Cook AI</div>
                <div className="text-muted-foreground">Today</div>
            </div>
            <div className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span>User</span>
            </div>
        </aside>
    )
}