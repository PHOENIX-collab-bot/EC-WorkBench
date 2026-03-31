import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { hasPerm } from '@/utils/permission';

interface Props extends ButtonProps {
  perm?: string;
}

export default function PermissionButton({ perm, children, ...rest }: Props): JSX.Element | null {
  if (perm && !hasPerm(perm)) return null;
  return <Button {...rest}>{children}</Button>;
}
