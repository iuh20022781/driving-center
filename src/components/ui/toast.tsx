"use client"

import * as React from "react"
import { CheckCircle2, X, AlertCircle, Info, AlertTriangle } from "lucide-react"

export interface ToastProps {
    id: string
    title?: string
    description?: string
    variant?: "default" | "success" | "destructive" | "warning" | "info"
    duration?: number
    onClose?: () => void
}

const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ')
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ title, description, variant = "default", duration, onClose, ...props }, ref) => {
        const [isVisible, setIsVisible] = React.useState(false)
        const [isExiting, setIsExiting] = React.useState(false)

        React.useEffect(() => {
            // Entrance animation
            const entranceTimer = setTimeout(() => setIsVisible(true), 10)

            if (onClose) {
                const toastDuration = duration || (variant === "success" ? 3500 : 4000)
                const exitTimer = setTimeout(() => {
                    setIsExiting(true)
                    setTimeout(() => {
                        setIsVisible(false)
                        setTimeout(onClose, 400)
                    }, 300)
                }, toastDuration)

                return () => {
                    clearTimeout(entranceTimer)
                    clearTimeout(exitTimer)
                }
            }

            return () => clearTimeout(entranceTimer)
        }, [onClose, variant, duration])

        const handleClose = () => {
            setIsExiting(true)
            setTimeout(() => {
                setIsVisible(false)
                onClose?.()
            }, 300)
        }

        const getIcon = () => {
            switch (variant) {
                case "success":
                    return <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                case "destructive":
                    return <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                case "warning":
                    return <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                case "info":
                    return <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                default:
                    return null
            }
        }

        const getToastStyles = () => {
            switch (variant) {
                case "success":
                    return "bg-white border-l-4 border-emerald-500 shadow-xl"
                case "destructive":
                    return "bg-white border-l-4 border-red-500 shadow-xl"
                case "warning":
                    return "bg-white border-l-4 border-amber-500 shadow-xl"
                case "info":
                    return "bg-white border-l-4 border-blue-500 shadow-xl"
                default:
                    return "bg-white border-l-4 border-gray-400 shadow-xl"
            }
        }

        const getTitleStyles = () => {
            switch (variant) {
                case "success":
                    return "text-gray-900 font-semibold"
                case "destructive":
                    return "text-gray-900 font-semibold"
                case "warning":
                    return "text-gray-900 font-semibold"
                case "info":
                    return "text-gray-900 font-semibold"
                default:
                    return "text-gray-900 font-semibold"
            }
        }

        const getDescriptionStyles = () => {
            return "text-gray-600"
        }

        const getProgressBarStyles = () => {
            switch (variant) {
                case "success":
                    return "bg-emerald-500"
                case "destructive":
                    return "bg-red-500"
                case "warning":
                    return "bg-amber-500"
                case "info":
                    return "bg-blue-500"
                default:
                    return "bg-gray-400"
            }
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "relative w-96 max-w-sm transform transition-all duration-400 ease-out overflow-hidden",
                    isVisible && !isExiting
                        ? "translate-x-0 opacity-100 scale-100"
                        : isExiting
                        ? "translate-x-full opacity-0 scale-95"
                        : "translate-x-full opacity-0 scale-95"
                )}
                style={{
                    animation: isVisible && !isExiting ? 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : undefined
                }}
                {...props}
            >
                <div className={cn(
                    "relative rounded-lg backdrop-blur-sm",
                    getToastStyles()
                )}>
                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden rounded-b-lg">
                        <div 
                            className={cn("h-full transition-all", getProgressBarStyles())}
                            style={{
                                animation: `shrink ${duration || (variant === "success" ? 3500 : 4000)}ms linear`,
                                transformOrigin: 'left'
                            }}
                        />
                    </div>

                    <div className="p-4 pr-12">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                                {getIcon()}
                            </div>
                            <div className="flex-1 min-w-0">
                                {title && (
                                    <div className={cn("text-sm mb-1", getTitleStyles())}>
                                        {title}
                                    </div>
                                )}
                                {description && (
                                    <div className={cn("text-sm leading-relaxed", getDescriptionStyles())}>
                                        {description}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {onClose && (
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    )}
                </div>

                <style jsx>{`
                    @keyframes slideIn {
                        from {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }

                    @keyframes shrink {
                        from {
                            transform: scaleX(1);
                        }
                        to {
                            transform: scaleX(0);
                        }
                    }
                `}</style>
            </div>
        )
    }
)
Toast.displayName = "Toast"

// Toast Provider Context
interface ToastContextType {
    toasts: ToastProps[]
    addToast: (toast: Omit<ToastProps, "id">) => void
    removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = React.useState<ToastProps[]>([])

    const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts((prev) => [...prev, { ...toast, id }])
    }, [])

    const removeToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast, index) => (
                    <div 
                        key={toast.id} 
                        className="pointer-events-auto"
                        style={{
                            animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
                        }}
                    >
                        <Toast
                            {...toast}
                            onClose={() => removeToast(toast.id)}
                        />
                    </div>
                ))}
            </div>
            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const context = React.useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

// Demo Component
export default function ToastDemo() {
    const { addToast } = useToast()

    const showToast = (variant: ToastProps['variant']) => {
        const toastMessages = {
            success: {
                title: "Đăng nhập thành công!",
                description: "Xin chào Nguyễn Văn A!"
            },
            destructive: {
                title: "Lỗi xảy ra",
                description: "Không thể kết nối đến máy chủ. Vui lòng thử lại."
            },
            warning: {
                title: "Cảnh báo",
                description: "Phiên đăng nhập sắp hết hạn trong 5 phút."
            },
            info: {
                title: "Thông tin",
                description: "Có 3 tin nhắn mới chưa đọc."
            },
            default: {
                title: "Thông báo",
                description: "Đây là thông báo mặc định."
            }
        }

        const message = toastMessages[variant || 'default']
        addToast({
            variant,
            title: message.title,
            description: message.description
        })
    }

    return (
        <ToastProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Enhanced Toast UI
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Toast thông báo với hiệu ứng mượt mà và giao diện chuyên nghiệp
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <button
                                onClick={() => showToast('success')}
                                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Success Toast
                            </button>

                            <button
                                onClick={() => showToast('destructive')}
                                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Error Toast
                            </button>

                            <button
                                onClick={() => showToast('warning')}
                                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Warning Toast
                            </button>

                            <button
                                onClick={() => showToast('info')}
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Info Toast
                            </button>

                            <button
                                onClick={() => showToast('default')}
                                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Default Toast
                            </button>
                        </div>

                        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-3">Các cải tiến:</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>Animation mượt mà với cubic-bezier easing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>Progress bar hiển thị thời gian còn lại</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>Border accent bên trái theo màu variant</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>Shadow và backdrop blur cho độ sâu</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>Stacked animation khi có nhiều toast</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ToastProvider>
    )
}