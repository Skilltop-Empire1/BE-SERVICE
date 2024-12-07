class UserClass{
    // welcome  method
    welcome = async (req, res)=>{
        res.json({msg: "Welcome to our work"})

    }

}
const usersClass = new UserClass()
module.exports =usersClass