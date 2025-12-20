'use client';

import React from 'react';
import Modal from './Modal';
import { useTranslations } from 'next-intl';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: 'danger' | 'info';
}

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText,
    cancelText,
    isLoading,
    variant = 'danger'
}: ConfirmationModalProps) => {
    const t = useTranslations('Admin');

    const confirmBtnClasses = variant === 'danger'
        ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex flex-col gap-8">
                <p className="text-xl font-bold text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                    {message}
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-6 py-4 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white font-black rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-700 transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm"
                    >
                        {cancelText || t('no')}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 px-6 py-4 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg disabled:opacity-50 uppercase tracking-widest text-sm ${confirmBtnClasses}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            </div>
                        ) : (
                            confirmText || t('yes')
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
