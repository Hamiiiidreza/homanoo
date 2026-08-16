import { useEffect, useState } from 'react';
import useLocation from '../../../../../../endpoints/useLocation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../../../../../../endpoints/useUser';
import { useQueryClient } from '@tanstack/react-query';

const schema = z.object({
  province: z.string().min(1, 'استان را انتخاب کنید'),
  city: z.string().min(1, 'شهر را انتخاب کنید'),
  postalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  address: z.string().min(10, 'آدرس را کامل وارد کنید'),
});

type FormValues = z.infer<typeof schema>;

const useAddress = () => {
  const { data } = useLocation();
  const [open, setOpen] = useState(false);
  const { createAddressMutation } = useUser();
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      province: '',
      city: '',
      postalCode: '',
      address: '',
    },
  });

  const selectedProvince = watch('province');

  const onSubmit = (values: FormValues) => {
    const province = (data as any).provinces.find(
      (p: { provinceId: string }) => p.provinceId == values.province,
    );

    const city = (data as any).cities.find(
      (c: { cityId: string; provinceId: string }) =>
        c.cityId == values.city && c.provinceId == province.provinceId,
    );

    createAddressMutation.mutate(
      {
        postalCode: values.postalCode,
        address: values.address,
        province,
        city,
      },
      {
        onSuccess() {
          setOpen(false);
          queryClient.invalidateQueries({
            queryKey: ['me'],
          });
        },
      },
    );
  };

  useEffect(() => {
    setValue('city', '');
  }, [selectedProvince]);

  return {
    data,
    setOpen,
    open,
    onSubmit,
    isSubmitting,
    errors,
    register,
    handleSubmit,
    selectedProvince,
    control,
    reset,
  };
};

export default useAddress;