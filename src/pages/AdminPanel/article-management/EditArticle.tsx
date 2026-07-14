import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
    ChevronLeft,
    FileText,
    FolderOpen,
    Image as ImageIcon,
    Save,
    User,
    Eye,
    Clock3,
    CheckCircle2,
    Upload,
    X,
} from "lucide-react";

import PageHierarchy from "../../../components/modules/Page-Hierarchy/page-hierarchy";
import CustomInput from "../../../components/ui/custom-input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const categoryOptions = [
    { label: "راهنما و آموزش", value: "guide" },
    { label: "اخبار", value: "news" },
    { label: "مقالات آموزشی", value: "education" },
];

const statusOptions = [
    { label: "پیش‌نویس", value: "draft" },
    { label: "منتشر شده", value: "published" },
    { label: "در انتظار بررسی", value: "review" },
] as const;

const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: ["", "center", "right", "justify"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        ["link"],
        ["clean"],
    ],
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
};

const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "indent",
    "blockquote",
    "code-block",
    "link",
];

const getPlainText = (html: string) => {
    return html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&zwnj;/gi, "‌")
        .replace(/&amp;/gi, "&")
        .replace(/\s+/g, " ")
        .trim();
};

const articleSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "لطفاً عنوان مقاله را وارد کنید."),
    content: z
        .string()
        .refine(
            (value) => getPlainText(value).length > 0,
            "برای ذخیره، محتوای مقاله الزامی است."
        ),
    category: z
        .string()
        .trim()
        .min(1, "لطفاً دسته‌بندی مقاله را انتخاب کنید."),
    author: z.string().trim().optional(),
    status: z.enum(["draft", "published", "review"], {
        errorMap: () => ({ message: "لطفاً وضعیت مقاله را انتخاب کنید." }),
    }),
    updatedAt: z.string().optional(),
    featuredImage: z
        .union([z.instanceof(File), z.null()])
        .optional()
        .refine(
            (file) =>
                !file ||
                ALLOWED_IMAGE_TYPES.includes(
                    file.type as (typeof ALLOWED_IMAGE_TYPES)[number]
                ),
            "فرمت تصویر باید JPG، PNG یا WEBP باشد."
        )
        .refine(
            (file) => !file || file.size <= MAX_IMAGE_SIZE,
            "حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد."
        ),
    featuredImageUrl: z.string().nullable().optional(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;
type ArticleStatus = "draft" | "published" | "review";

const EditArticle: React.FC = () => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const [imagePreview, setImagePreview] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [isDraftSaving, setIsDraftSaving] = useState(false);

    const initialData: ArticleFormValues = {
        title: "راهنمای کامل انتخاب مبل مناسب برای خانه مدرن",
        content: `<p>انتخاب مبل مناسب یکی از مهم‌ترین تصمیمات در طراحی داخلی است، به‌خصوص اگر فضای شما زیبا و فضایی دلنشین باشد.</p>
<p>در این راهنما، نکات کلیدی برای انتخاب مبل مناسب با توجه به سبک، فضا و نیازهای شما را بررسی می‌کنیم.</p>
<p>۱. اندازه فضا را در نظر بگیرید</p>
<p>قبل از خرید مبل، ابعاد فضای نشیمن خود را اندازه‌گیری کنید. برای فضاهای کوچک، مبل‌های مینیمال و تاشو، انتخاب‌های بهتری هستند.</p>`,
        category: "guide",
        author: "سینا یوسفی",
        status: "draft",
        updatedAt: "۱۴۰۳/۰۳/۲۵ | ۱۶:۴۲:۳۵",
        featuredImage: null,
        featuredImageUrl: "/Images/product-15.png",
    };

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ArticleFormValues>({
        resolver: zodResolver(articleSchema),
        defaultValues: initialData,
        mode: "onSubmit",
    });

    const contentValue = watch("content");
    const featuredImage = watch("featuredImage");
    const featuredImageUrl = watch("featuredImageUrl");

    useEffect(() => {
        if (featuredImage) {
            const objectUrl = URL.createObjectURL(featuredImage);
            setImagePreview(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

        setImagePreview(featuredImageUrl || "");
    }, [featuredImage, featuredImageUrl]);

    const wordCount = useMemo(() => {
        const plainText = getPlainText(contentValue || "");
        if (!plainText) {
            return 0;
        }
        return plainText.split(/\s+/).length;
    }, [contentValue]);

    const handleFeaturedImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        if (
            !ALLOWED_IMAGE_TYPES.includes(
                selectedFile.type as (typeof ALLOWED_IMAGE_TYPES)[number]
            )
        ) {
            setError("featuredImage", {
                type: "manual",
                message: "فرمت تصویر باید JPG، PNG یا WEBP باشد.",
            });
            event.target.value = "";
            return;
        }

        if (selectedFile.size > MAX_IMAGE_SIZE) {
            setError("featuredImage", {
                type: "manual",
                message: "حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد.",
            });
            event.target.value = "";
            return;
        }

        setValue("featuredImage", selectedFile, { shouldValidate: true });
        setValue("featuredImageUrl", null, { shouldValidate: false });
        clearErrors("featuredImage");
        setSubmitError("");
    };

    const handleRemoveFeaturedImage = () => {
        setValue("featuredImage", null, { shouldValidate: true });
        setValue("featuredImageUrl", null, { shouldValidate: false });
        clearErrors("featuredImage");
        setSubmitError("");

        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    const saveArticle = async (
        values: ArticleFormValues,
        overrideStatus?: ArticleStatus
    ) => {
        try {
            setSubmitError("");

            const finalStatus = overrideStatus || values.status;

            const requestData = new FormData();
            requestData.append("title", values.title.trim());
            requestData.append("content", values.content);
            requestData.append("category", values.category);
            requestData.append("author", values.author?.trim() || "");
            requestData.append("status", finalStatus);
            requestData.append("updatedAt", values.updatedAt || "");

            if (values.featuredImage) {
                requestData.append("featuredImage", values.featuredImage);
            }

            if (!values.featuredImage && values.featuredImageUrl) {
                requestData.append("featuredImageUrl", values.featuredImageUrl);
            }

            /*
             * این بخش را با API واقعی پروژه جایگزین کن.
             *
             * await fetch(`/api/articles/${articleId}`, {
             *     method: "PUT",
             *     body: requestData,
             * });
             */

            console.log("Article status:", finalStatus);
            console.log(
                "Edit article data:",
                Object.fromEntries(requestData.entries())
            );
        } catch (error) {
            console.error("Failed to update article:", error);
            setSubmitError("ذخیره تغییرات با خطا مواجه شد. دوباره تلاش کنید.");
        }
    };

    const onSubmit: SubmitHandler<ArticleFormValues> = async (values) => {
        await saveArticle(values);
    };

    const handleSaveAsDraft = async () => {
        setIsDraftSaving(true);
        setSubmitError("");

        try {
            const values = {
                title: watch("title") || "",
                content: watch("content") || "",
                category: watch("category") || "",
                author: watch("author") || "",
                status: "draft" as ArticleStatus,
                updatedAt: watch("updatedAt") || "",
                featuredImage: watch("featuredImage") || null,
                featuredImageUrl: watch("featuredImageUrl") || null,
            };

            const requestData = new FormData();
            requestData.append("title", values.title.trim());
            requestData.append("content", values.content);
            requestData.append("category", values.category);
            requestData.append("author", values.author.trim());
            requestData.append("status", "draft");
            requestData.append("updatedAt", values.updatedAt);

            if (values.featuredImage) {
                requestData.append("featuredImage", values.featuredImage);
            }

            if (!values.featuredImage && values.featuredImageUrl) {
                requestData.append("featuredImageUrl", values.featuredImageUrl);
            }

            /*
             * این بخش را با API واقعی پروژه جایگزین کن.
             *
             * await fetch(`/api/articles/${articleId}`, {
             *     method: "PUT",
             *     body: requestData,
             * });
             */

            console.log("Article status:", "draft");
            console.log(
                "Draft article data:",
                Object.fromEntries(requestData.entries())
            );
        } catch (error) {
            console.error("Failed to save draft:", error);
            setSubmitError("ذخیره پیش‌نویس با خطا مواجه شد. دوباره تلاش کنید.");
        } finally {
            setIsDraftSaving(false);
        }
    };

    return (
        <div
            className="my-10 w-full rounded-md border bg-white p-6 shadow-lg transition-all hover:drop-shadow-custom"
            dir="rtl"
        >
            <div className="mb-8 flex flex-col gap-4">
                <h1 className="flex items-center text-2xl font-VazirBold text-neutral-07">
                    ویرایش مقاله
                </h1>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <PageHierarchy
                        items={["مدیریت و بررسی مقالات", "ویرایش مقاله"]}
                    />

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-main bg-white px-6 py-2 text-gray-700 shadow-sm transition-all hover:bg-main hover:text-white"
                    >
                        <ChevronLeft size={16} />
                        بازگشت
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto grid max-w-5xl grid-cols-12 items-start gap-8 rounded-md border bg-white p-6 shadow-sm">
                    <div className="col-span-12 space-y-6 lg:col-span-8">
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <CustomInput
                                        label="عنوان مقاله *"
                                        name={field.name}
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            if (submitError) {
                                                setSubmitError("");
                                            }
                                        }}
                                        placeholder="عنوان مقاله را وارد کنید..."
                                        wrapperClassName="w-full"
                                        inputClassName="w-full rounded-md border px-3 py-5 text-sm"
                                    />
                                    {errors.title && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />

                        <div>
                            <label className="mb-2 block text-xs font-bold text-neutral-07">
                                محتوای مقاله
                                <span className="mr-1 font-VazirBold text-sm">*</span>
                            </label>

                            <div className="article-editor overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                                <Controller
                                    name="content"
                                    control={control}
                                    render={({ field }) => (
                                        <ReactQuill
                                            theme="snow"
                                            value={field.value}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                if (submitError) {
                                                    setSubmitError("");
                                                }
                                            }}
                                            modules={quillModules}
                                            formats={quillFormats}
                                            placeholder="متن مقاله را بنویسید..."
                                            className="text-sm text-gray-700"
                                        />
                                    )}
                                />

                                <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-left text-[10px] text-gray-400">
                                    تعداد کلمات: {wordCount}
                                </div>
                            </div>

                            {errors.content && (
                                <p className="mt-2 text-xs text-red-500">
                                    {errors.content.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-neutral-07">
                                تصویر شاخص
                            </label>

                            <p className="font-VazirRegular text-[10px] text-gray-400">
                                تصویری که به‌عنوان نمای اصلی مقاله نمایش داده می‌شود.
                            </p>

                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleFeaturedImageChange}
                                className="hidden"
                            />

                            {imagePreview ? (
                                <div className="relative overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                                    <img
                                        src={imagePreview}
                                        alt="پیش‌نمایش تصویر شاخص"
                                        className="aspect-video w-full object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleRemoveFeaturedImage}
                                        aria-label="حذف تصویر شاخص"
                                        className="absolute left-3 top-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-red-500 shadow-md transition-colors hover:bg-red-500 hover:text-white"
                                    >
                                        <X size={17} />
                                    </button>

                                    <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
                                        <div className="flex min-w-0 items-center gap-2">
                                            <ImageIcon className="size-4 shrink-0 text-secondary-color-blue" />
                                            <span className="truncate text-xs text-gray-600">
                                                {featuredImage?.name ||
                                                    "تصویر فعلی مقاله"}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                imageInputRef.current?.click()
                                            }
                                            className="shrink-0 cursor-pointer text-xs font-VazirBold text-secondary-color-blue"
                                        >
                                            تغییر تصویر
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => imageInputRef.current?.click()}
                                    className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-md border bg-white p-8 text-center transition-colors hover:border-secondary-color-blue"
                                >
                                    <span className="mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-01 text-secondary-color-blue transition-transform group-hover:scale-105">
                                        <Upload className="size-5" />
                                    </span>

                                    <span className="mb-2 text-xs font-bold text-gray-800">
                                        برای انتخاب تصویر کلیک کنید
                                    </span>

                                    <span className="font-VazirRegular text-[10px] text-gray-400">
                                        فرمت‌های مجاز: JPG، PNG، WEBP - حداکثر حجم:
                                        ۱۰MB - نسبت پیشنهادی: 16:9
                                    </span>
                                </button>
                            )}

                            {errors.featuredImage && (
                                <p className="text-xs text-red-500">
                                    {errors.featuredImage.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-12 flex min-h-[500px] h-full flex-col justify-between space-y-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm lg:col-span-4">
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1">
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-2 text-gray-800">
                                    <FolderOpen className="size-4 text-secondary-color-blue" />
                                    <span className="text-xs font-VazirBold">
                                        دسته‌بندی
                                        <span className="mr-1 font-VazirBold text-sm">*</span>
                                    </span>
                                </div>

                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                dir="rtl"
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    if (submitError) {
                                                        setSubmitError("");
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="h-[38px] w-full border text-xs focus:border-secondary-color-blue focus:ring-0">
                                                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                                                </SelectTrigger>

                                                <SelectContent
                                                    dir="rtl"
                                                    className="text-right"
                                                >
                                                    {categoryOptions.map((item) => (
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            {errors.category && (
                                                <p className="mt-2 text-xs text-red-500">
                                                    {errors.category.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            <Controller
                                name="author"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <CustomInput
                                            label="نویسنده"
                                            labelIcon={
                                                <User className="size-4 text-secondary-color-blue" />
                                            }
                                            name={field.name}
                                            value={field.value || ""}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                if (submitError) {
                                                    setSubmitError("");
                                                }
                                            }}
                                            placeholder="نام نویسنده را وارد کنید..."
                                            wrapperClassName="w-full space-y-2.5"
                                            labelClassName="text-xs font-bold text-gray-800"
                                            inputClassName="w-full rounded-lg border bg-white px-3 py-2.5 text-xs outline-none focus:border-[#9A6B3D]"
                                        />
                                    </div>
                                )}
                            />

                            <div className="space-y-2.5">
                                <div className="flex items-center gap-2 text-gray-800">
                                    <CheckCircle2 className="size-4 text-secondary-color-blue" />
                                    <span className="text-xs font-VazirBold">
                                        وضعیت مقاله
                                    </span>
                                </div>

                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                dir="rtl"
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value as ArticleStatus);
                                                    if (submitError) {
                                                        setSubmitError("");
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="h-[38px] w-full border text-xs focus:border-secondary-color-blue focus:ring-0">
                                                    <SelectValue placeholder="انتخاب وضعیت" />
                                                </SelectTrigger>

                                                <SelectContent className="text-right">
                                                    {statusOptions.map((item) => (
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            {errors.status && (
                                                <p className="mt-2 text-xs text-red-500">
                                                    {errors.status.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            <Controller
                                name="updatedAt"
                                control={control}
                                render={({ field }) => (
                                    <CustomInput
                                        label="آخرین بروزرسانی"
                                        labelIcon={
                                            <Clock3 className="size-4 text-secondary-color-blue" />
                                        }
                                        name={field.name}
                                        value={field.value || ""}
                                        onChange={() => { }}
                                        disabled
                                        wrapperClassName="w-full space-y-2.5"
                                        labelClassName="text-xs font-VazirBold text-gray-800"
                                        inputClassName="w-full rounded-lg border bg-gray-50 px-3 py-2.5 text-xs text-gray-500 outline-none"
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-4 border-t border-gray-100 pt-6">
                            {submitError && (
                                <div className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-xs leading-6 text-red-600">
                                    {submitError}
                                </div>
                            )}

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row xl:justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isDraftSaving}
                                    className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-main px-6 py-3 text-xs font-VazirBold text-white shadow-sm transition-colors hover:bg-main/90 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
                                >
                                    <Save size={16} />
                                    {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
                                </button>

                                <button
                                    type="button"
                                    className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border bg-white px-4 py-2 text-xs font-VazirBold text-gray-600 transition-colors hover:bg-main hover:text-white whitespace-nowrap"
                                >
                                    <Eye size={16} />
                                    پیش‌نمایش
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditArticle;
