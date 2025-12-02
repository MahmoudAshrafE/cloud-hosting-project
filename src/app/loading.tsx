import ButtonSpiner from "@/components/ButtonSpiner"

const loading = () => {
    return (
        <section className='fix-height p-5 flex items-center justify-center'>
            <ButtonSpiner />
        </section>
    )
}

export default loading