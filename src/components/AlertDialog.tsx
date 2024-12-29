import React from 'react';
import { Dialog } from './Dialog';
import { Button } from './ui/Button';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  loading?: boolean;
  variant?: 'default' | 'destructive';
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  description,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onConfirm,
  loading = false,
  variant = 'default'
}) => {
  return (
    <Dialog title={title} isOpen={open} onClose={onClose}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-mono text-neutral-200">
            {title}
          </h3>
          {description && (
            <p className="text-sm font-mono text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}; 