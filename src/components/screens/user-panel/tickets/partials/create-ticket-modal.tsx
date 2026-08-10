import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../../../components/ui/dialog';
import { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../../../components/ui/select';
import { Button } from '../../../../ui/button';
import { toast } from 'sonner';
import useTicket from '../../../../../endpoints/useTicket';

const CreateTicketModal = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const { createTicketMutation } = useTicket();

    const createTicketHandler = (event: any) => {
        event.preventDefault();
        if (!body || !title) {
            toast.error('لطفا موضوع و متن   تیکت رو وارد کنید');
        } else {
            createTicketMutation.mutate(
                { body, title },
                {
                    onSuccess() {
                        setTitle('');
                        setBody('');
                        setOpen(false);
                    },
                },
            );
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='sm:!w-max w-full' variant={'main'}>
                    <Plus size={18} />
                    ایجاد تیکت جدید
                </Button>
            </DialogTrigger>

            <DialogContent className="font-VazirRegular sm:max-w-[450px]" dir="rtl">
                <form>
                    <DialogHeader>
                        <DialogTitle className="font-VazirBold mb-4 text-center">
                            ایجاد تیکت جدید
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label
                                htmlFor="title"
                                className="text-neutral-05 mb-2 block text-sm"
                            >
                                موضوع *
                            </label>
                            <Select
                                value={title}
                                onValueChange={(v) => setTitle(v)}
                                dir="rtl"
                            >
                                <SelectTrigger dir="ltr" id="title" className={`w-full`}>
                                    <SelectValue placeholder="انتخاب موضوع" />
                                </SelectTrigger>
                                <SelectContent className="font-VazirMedium text-sm">
                                    <SelectItem value="site">مشکل فنی</SelectItem>
                                    <SelectItem value="order">سفارشات</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label
                                htmlFor="body"
                                className="text-neutral-05 mb-2 block text-sm"
                            >
                                متن پیام *
                            </label>
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                id="body"
                                className={`h-32 w-full rounded-md border border-gray-200 p-3 shadow-sm transition-all outline-none hover:shadow-[0_4px_4px_rgb(0,0,0,0.25)]`}
                                placeholder="متن پیام خود را با جزئیات وارد کنید..."
                            />
                        </div>
                    </div>

                    <Button onClick={createTicketHandler} className='w-full mt-3' type="submit" variant={'main'}>
                        <Send size={16} />
                        ارسال
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTicketModal;
