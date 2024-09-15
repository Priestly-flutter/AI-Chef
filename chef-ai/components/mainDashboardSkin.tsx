"use client"

import { Input } from "@/components/ui/input";

// TODO the content of line 12 to line 14 will be updated that the content are gotten from the most popular search per loaction of the user

export default function MainDashSkin () {
    return(
        <main className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold">Creative Cook AI</h1>
            <div className="mt-2">
                <ul className=" ml-auto flex gap-4 sm:gap-6 ">
                    
                    <li className="box-border border pl-3 pr-3"><h3>BreakFast On The Go</h3></li>
                    <li className="box-border border pl-3 pr-3"><h3>Dinner</h3></li>
                    <li className="box-border border pl-3 pr-3"><h3>Take a quick lesson</h3></li>
                </ul>
            </div>
            <div className="mt-8 w-1/2">
            <Input placeholder="Type here..." className="w-full "/>
            </div>
        </main>
    )
}