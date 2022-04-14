export type NotificationModalNotification = {
  text: string;
  link?: string;
  createdAt: number | undefined;
  alert?: string;
};

export type NotificationModalProps = {
  notification?: NotificationModalNotification;
  handleClose: () => void;
};
