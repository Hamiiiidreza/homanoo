import React, { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
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
    Send,
    Upload,
    User,
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
            "برای انتشار، محتوای مقاله الزامی است."
        ),
    category: z
        .string()
        .trim()
        .min(1, "برای انتشار، دسته‌بندی مقاله را انتخاب کنید."),
    author: z.string().trim().optional(),
    featuredImage: z
        .instanceof(File)
        .nullable()
        .optional()
        .refine(
            (file) => !file || ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number]),
            "فرمت تصویر باید JPG، PNG یا WEBP باشد."
        )
        .refine(
            (file) => !file || file.size <= MAX_IMAGE_SIZE,
            "حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد."
        ),
});

type ArticleFormValues = z.infer<typeof articleSchema>;
type PublishStatus = "published" | "draft";

const AddArticle: React.FC = () => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [isDraftSaving, setIsDraftSaving] = useState(false);

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
        defaultValues: {
            title: "",
            content: "",
            category: "",
            author: "",
            featuredImage: null,
        },
        mode: "onSubmit",
    });

    const contentValue = watch("content");
    const featuredImage = watch("featuredImage");

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

        if (!ALLOWED_IMAGE_TYPES.includes(selectedFile.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
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

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        const previewUrl = URL.createObjectURL(selectedFile);

        setImagePreview(previewUrl);
        setValue("featuredImage", selectedFile, { shouldValidate: true });
        clearErrors("featuredImage");
    };

    const handleRemoveFeaturedImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImagePreview("");
        setValue("featuredImage", null, { shouldValidate: true });
        clearErrors("featuredImage");

        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

    const saveArticle = async (
        values: ArticleFormValues,
        status: PublishStatus
    ) => {
        try {
            setSubmitError("");

            const requestData = new FormData();
            requestData.append("title", values.title.trim());
            requestData.append("content", values.content);
            requestData.append("category", values.category);
            requestData.append("author", values.author?.trim() || "");
            requestData.append("status", status);

            if (values.featuredImage) {
                requestData.append("featuredImage", values.featuredImage);
            }

            /*
             * این بخش را با API واقعی پروژه جایگزین کن.
             *
             * await fetch("/api/articles", {
             *     method: "POST",
             *     body: requestData,
             * });
             */

            console.log("Article status:", status);
            console.log(
                "Article data:",
                Object.fromEntries(requestData.entries())
            );
        } catch (error) {
            console.error("Failed to save article:", error);
            setSubmitError("ذخیره مقاله با خطا مواجه شد. دوباره تلاش کنید.");
        }
    };

    const onPublish: SubmitHandler<ArticleFormValues> = async (values) => {
        await saveArticle(values, "published");
    };

    const handleDraftSave = async () => {
        setIsDraftSaving(true);
        setSubmitError("");

        try {
            const values = {
                title: watch("title") || "",
                content: watch("content") || "",
                category: watch("category") || "",
                author: watch("author") || "",
                featuredImage: watch("featuredImage") || null,
            };

            const requestData = new FormData();
            requestData.append("title", values.title.trim());
            requestData.append("content", values.content);
            requestData.append("category", values.category);
            requestData.append("author", values.author.trim());
            requestData.append("status", "draft");

            if (values.featuredImage) {
                requestData.append("featuredImage", values.featuredImage);
            }

            /*
             * این بخش را با API واقعی پروژه جایگزین کن.
             *
             * await fetch("/api/articles", {
             *     method: "POST",
             *     body: requestData,
             * });
             */

            console.log("Article status:", "draft");
            console.log(
                "Article data:",
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
                    افزودن مقاله جدید
                </h1>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <PageHierarchy
                        items={["مدیریت و بررسی مقالات", "افزودن مقاله جدید"]}
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

            <form onSubmit={handleSubmit(onPublish)}>
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
                                        onChange={field.onChange}
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
                                <span className="mr-1 font-VazirBold text-sm">
                                    *
                                </span>
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
                                                {featuredImage?.name}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => imageInputRef.current?.click()}
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
                                        فرمت‌های مجاز: JPG، PNG، WEBP - حداکثر حجم: ۱۰MB - نسبت پیشنهادی: 16:9
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
                        <div className="space-y-10">
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-2 text-gray-800">
                                    <FolderOpen className="size-4 text-secondary-color-blue" />
                                    <span className="text-xs font-VazirBold">
                                        دسته‌بندی
                                        <span className="mr-1 font-VazirBold text-sm">
                                            *
                                        </span>
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

                                                <SelectContent dir="rtl" className="text-right">
                                                    <SelectItem value="tech">تکنولوژی</SelectItem>
                                                    <SelectItem value="design">طراحی</SelectItem>
                                                    <SelectItem value="business">کسب‌وکار</SelectItem>
                                                    <SelectItem value="education">آموزش</SelectItem>
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
                                            onChange={field.onChange}
                                            placeholder="نام نویسنده را وارد کنید..."
                                            wrapperClassName="w-full space-y-2.5"
                                            labelClassName="text-xs font-bold text-gray-800"
                                            inputClassName="w-full rounded-lg border bg-white px-3 py-2.5 text-xs outline-none focus:border-[#9A6B3D]"
                                        />
                                    </div>
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
                                    <Send size={16} />
                                    {isSubmitting ? "در حال ذخیره..." : "انتشار"}
                                </button>

                                <button
                                    type="button"
                                    disabled={isSubmitting || isDraftSaving}
                                    onClick={handleDraftSave}
                                    className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border bg-white px-4 py-2 text-xs font-VazirBold text-gray-600 transition-colors hover:bg-main hover:text-white disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
                                >
                                    <FileText size={16} />
                                    {isDraftSaving ? "در حال ذخیره..." : "ذخیره پیش‌نویس"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddArticle;



