export type ServiceCardProps = {
    icon: string;
    title: string;
    description: string;
};
export interface CheckoutReqBody {
    information: {
        postalCode: string;
        address: string;
        city: {
            cityId: string;
            cityName: string;
            provinceId: string;
        };
        province: {
            provinceId: string;
            provinceName: string;
        };
        firstName: string;
        lastName: string;
    };
}