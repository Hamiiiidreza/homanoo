import ContactUsForm from './partials/form';
import Container from '../../../components/modules/container';
import Breadcrumb from '../../modules/breadcrumb';
import Communications from './partials/communications';
import Map from '../../modules/map';

const ContactUsScreen = () => {
    return (
        <Container>
            <Breadcrumb className="pt-5" title="تماس با ما" />
            <div className="pt-5 pb-20">
                <div className="lg:before:!rounded-b-l-none before:content-[] before:bg-main relative flex w-full flex-col-reverse gap-8 rounded-3xl bg-white p-6 shadow-[0px_4px_24px_0px_#00000014] before:absolute before:right-0 before:bottom-0 before:h-[160px] before:w-full before:rounded-b-3xl lg:!flex-row lg:before:!top-0 lg:before:!h-full lg:before:!w-[20%] lg:before:!rounded-r-3xl">
                    <div className="flex w-full lg:!p-2">
                        <Map
                            position={[29.87739213881141, 52.806453926799264]}
                            className="!h-[200px] !w-full sm:!h-[300px] lg:!h-auto lg:!w-[83%]"
                        />
                    </div>
                    <div className="mx-auto w-full max-w-[500px]">
                        <ContactUsForm />
                        <Communications />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContactUsScreen;