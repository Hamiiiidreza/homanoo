import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            className="toaster group"
            position='top-right'
            richColors
            // toastOptions={{
            //     classNames: {
            //         toast: "text-base",
            //         title: "text-base font-semibold",
            //         description: "text-base",
            //     },
            // }}
            style={{
                fontFamily: 'Vazir Medium',
            }}
            {...props}
        />
    );
};

export { Toaster };