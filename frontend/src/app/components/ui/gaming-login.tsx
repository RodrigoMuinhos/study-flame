'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Chrome, Twitter, Gamepad2 } from 'lucide-react';

interface LoginFormProps {
    onSubmit: (cpf: string, password: string, remember: boolean) => void;
    isLoading?: boolean;
}

interface VideoBackgroundProps {
    /** Optional background image; fallback uses Flamebanner.png */
    videoUrl?: string;
}

interface FormInputProps {
    icon: React.ReactNode;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

interface SocialButtonProps {
    icon: React.ReactNode;
    name: string;
}

interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    id: string;
}

// FormInput Component
const FormInput: React.FC<FormInputProps> = ({ icon, type, placeholder, value, onChange, required }) => {
    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all"
            />
        </div>
    );
};

// SocialButton Component
const SocialButton: React.FC<SocialButtonProps> = ({ icon }) => {
    return (
        <button type="button" className="flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors">
            {icon}
        </button>
    );
};

// ToggleSwitch Component
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, id }) => {
    return (
        <div className="relative inline-block w-10 h-5 cursor-pointer">
            <input
                type="checkbox"
                id={id}
                className="sr-only"
                checked={checked}
                onChange={onChange}
            />
            <div className={`absolute inset-0 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white/20'}`}>
                <div className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${checked ? 'transform translate-x-5' : ''}`} />
            </div>
        </div>
    );
};

// VideoBackground Component (now static image for performance)
const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl }) => {
    const backgroundImage = videoUrl && /\.(mp4|webm|mov|ogg)$/i.test(videoUrl)
        ? '/Flamebanner.png'
        : (videoUrl || '/Flamebanner.png');

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div
                className="absolute inset-0 bg-[length:110%] bg-center bg-cover scale-105 blur-[0.5px]"
                style={{ backgroundImage: `url(${backgroundImage})` }}
                aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
        </div>
    );
};

// Main LoginForm Component
const GamingLoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading: externalLoading }) => {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        onSubmit(cpf, password, remember);
        setIsSubmitting(false);
    };

    const isLoading = isSubmitting || externalLoading;

    return (
        <div className="p-8 rounded-2xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-2xl">
            {/* Logo FLAME */}
            <div className="mb-6 flex justify-center">
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-600/30 via-red-500/30 to-yellow-500/30 blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                    <svg width="80" height="80" viewBox="0 0 180 180" fill="none" className="relative">
                        <defs>
                            <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FF6B35" />
                                <stop offset="50%" stopColor="#F7931E" />
                                <stop offset="100%" stopColor="#FFC837" />
                            </linearGradient>
                        </defs>
                        <path d="M90 20C70 40 60 60 60 85C60 110 72 130 90 130C108 130 120 110 120 85C120 60 110 40 90 20Z" fill="url(#flameGradient)" />
                        <path d="M90 45C80 55 75 65 75 80C75 95 82 105 90 105C98 105 105 95 105 80C105 65 100 55 90 45Z" fill="#FFE66D" opacity="0.8" />
                        <ellipse cx="90" cy="75" rx="8" ry="15" fill="#FFF9E6" opacity="0.6" />
                    </svg>
                </div>
            </div>

            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-3 relative group">
                    <span className="absolute -inset-1 bg-gradient-to-r from-orange-600/30 via-red-500/30 to-yellow-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
                    <span className="relative inline-block text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                        FLAME
                    </span>
                </h2>
                <div className="text-white/80 flex flex-col items-center space-y-2">
                    <span className="relative group cursor-default text-lg">
                        <span className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 to-red-600/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                        <span className="relative inline-block">Sua jornada tech começa aqui</span>
                    </span>
                    <span className="text-xs text-white/50 animate-pulse">
                        [Acesse o bootcamp que vai transformar sua carreira]
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                    icon={<User className="text-white/60" size={18} />}
                    type="text"
                    placeholder="CPF (000.000.000-00)"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    required
                />

                <div className="relative">
                    <FormInput
                        icon={<Lock className="text-white/60" size={18} />}
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div onClick={() => setRemember(!remember)} className="cursor-pointer">
                            <ToggleSwitch
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                id="remember-me"
                            />
                        </div>
                        <label
                            htmlFor="remember-me"
                            className="text-sm text-white/80 cursor-pointer hover:text-white transition-colors"
                            onClick={() => setRemember(!remember)}
                        >
                            Permanecer logado
                        </label>
                    </div>
                    <a href="#" className="text-sm text-white/80 hover:text-orange-400 transition-colors">
                        Esqueceu a senha?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Entrando...
                        </span>
                    ) : (
                        'Acessar FLAME 🔥'
                    )}
                </button>
            </form>
        </div>
    );
};

// Export as default components
const LoginPage = {
    LoginForm: GamingLoginForm,
    VideoBackground
};

export default LoginPage;
