'use strict';

module.exports={
    up:async (queryInterface,Sequelize)=>{
        return queryInterface.bulkInsert('Users',[{
            email:'tu092501@gmail.com',
            password:'123456',
            firstName:'CamTu',
            lastName:'Nguyen',
            address:'VN',
            phoneNumber:'0356466',
            gender:0,
            roleId:'R1',
            positionId:'doctor',
            image:'',
            createdAt:new Date(),
            updatedAt:new Date(),

        }])
    },
    down:async (queryInterface,Sequelize)=>{
        return queryInterface.bulkDelete('Users', null, {});
       
    }
}