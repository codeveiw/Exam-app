import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { changePasswordSchema, type ChangePasswordFormValues } from './schema/changePasswordSchema';

export default function useChangePasswordForm() {

      const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  return form
}
