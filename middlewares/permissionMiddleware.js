function checkPermission ([label,...requiredPerms])  {
    return async (req,res,next) => {
        try {
            const user = req.user
            if(!user || !user.permission){
                return res.status(403).json({error:"Access denied. No permission found"})
            }
            const userPermission = user.permission.find((perm) => perm.label === label)
            if(!userPermission){
                return res.status(403).json({error:"Access denied. No permission found"})
            }
            const hasRequiredPermissions = requiredPerms.every(perm => userPermission[perm])
            if(!hasRequiredPermissions){
                return res.status(403).json({error:"Access denied.Permission not found"})
            }
            next()
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = checkPermission