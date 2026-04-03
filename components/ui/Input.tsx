import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  className?: string;
}

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex min-w-0 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs',
        'transition-[color,box-shadow] outline-none',
        'placeholder:text-white/30 text-white',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'md:text-sm',
        'focus-visible:ring-[3px]',
        className
      )}
      {...props}
    />
  );
}
