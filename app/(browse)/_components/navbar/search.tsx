"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchIcon,X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!value) return;
        const url = qs.stringifyUrl({
            url: "/search",
            query: { term: value },
        }, { skipEmptyString: true });
        router.push(url);
    };
    const onClear = () => {
        setValue("");
        
    };
    return (
        <form 
            onSubmit={onSubmit}
            className="relative w-full  lg:w-[400px] flex items-center"
            >
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
                />
                {value && (
                    <X
                        className="absolute top-2.5 right-14 w-5 h-5 text-muted-foreground cursor-pointer hover:opacity-75"
                        onClick={onClear}
                        />
                    )}
                    <Button
                        type="submit"
                        size="sm"
                        variant="secondary"
                        className="rounded-l-none"
                        >
                            <SearchIcon className="w-5 h-5 text-muted-foreground" />
                        </Button>
            </form>
    );
};