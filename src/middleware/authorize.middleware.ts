export const authorizationMiddleware = (allowedRoles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You do not have the required permissions.",
        });
    }
    next();
  };
};
