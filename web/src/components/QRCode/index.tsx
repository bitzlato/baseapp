// tslint:disable-next-line
import QRCodeGenerator from 'qrcode.react';
import React from 'react';
import { qrCode } from './QRCode.css';

export interface QRCodeProps {
  /**
   * Data which is used to generate QR code(e.g. wallet address).
   * @default Required
   */
  data: string;
  /**
   * Defines the size of QR code component.
   * @default 118x118
   */
  dimensions?: number | undefined;
}

/**
 * Component for displaying QR code.
 */
const QRCodeComponent: React.FC<QRCodeProps> = ({ data = '', dimensions }) => {
  return (
    <div className={qrCode}>
      <QRCodeGenerator value={data} size={dimensions as number} renderAs="svg" />
    </div>
  );
};

export const QRCode = React.memo(QRCodeComponent);
