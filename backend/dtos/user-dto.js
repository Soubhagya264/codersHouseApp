class UseDto{
    id;
    phone;
    name;
    avtar;
    activated;
    createdAt;
    constructor(user){
      this.id=user._id;
      this.phone=user.phone;
      this.name=user.name;
      this.avtar=user.avtar? `${process.env.BASE_URL}${user.avtar}` : null;
      this.activated=user.activated;
      this.createdAt=user.createdAt;
    }
}
module.exports=UseDto;