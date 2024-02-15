"use client"

import styles from "./pagination.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Pagination = ({count}) => {
    const searchParams = useSearchParams();
    const {replace} = useRouter()
    const pathname = usePathname();

    const page = searchParams.get("page") || 1

    const params = new URLSearchParams(searchParams)

    const hasPrev = 2 * (
        parseInt(page) - 1
    ) > 0
    const hasNext = 2 * (
        parseInt(page) - 1
    ) + 2 < count

    const handleChangePage = (type) => {
        type === "prev"
            ? params.set("page", parseInt(page) - 1)
            : params.set("page", parseInt(page) + 1)
        
        replace(`${pathname}?${params}`)
    }

    return (
        <div className={styles.container}>
            <button onClick={() => handleChangePage("prev")} className={styles.button} disabled={!hasPrev}>Previous</button>
            <button onClick={() => handleChangePage("next")} className={styles.button} disabled={!hasNext}>Next</button>
        </div>
    )
}

export default Pagination
