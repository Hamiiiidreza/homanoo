const Communications = () => {
    return (
        <div className="xs:!grid flex grid-cols-[auto_auto_auto] flex-wrap justify-between gap-x-4 gap-y-4 pt-7 lg:!grid-cols-[auto_auto] lg:!gap-x-2">
            <div className="flex items-center gap-2">
                <img
                    width={28}
                    height={28}
                    src={'/Images/phone (2) 1.svg'}
                    alt="شماره"
                />
                <div>
                    <p className="text-sm text-[#0000007A]">تلفن</p>
                    <p className="text-xs font-semibold">09121234567</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <img
                    width={28}
                    height={28}
                    src={'/Images/email (2) 1.svg'}
                    alt="ایمیل"
                />
                <div>
                    <p className="text-sm text-[#0000007A]">ایمیل</p>
                    <p className="text-xs font-semibold">email@gmail.com</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <img
                    width={28}
                    height={28}
                    src={'/Images/placeholder (2) 1.svg'}
                    alt="راه ارتباطی"
                />
                <div>
                    <p className="text-sm text-[#0000007A]">آدرس</p>
                    <p className="text-xs font-semibold">tehrannnnnnnnnnn</p>
                </div>
            </div>
        </div>
    );
};

export default Communications;
