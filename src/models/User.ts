import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Exclude } from "class-transformer";

@Entity("usuarios")
class User {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;
    
    @Column("varchar", { length: 64, nullable: false })
    public name!: string;

    @Column("varchar", { length: 64, nullable: false })
    public email!: string;

    @Exclude()
    @Column("varchar", { length: 255, nullable: false })
    public password!: string;
}

export default User;