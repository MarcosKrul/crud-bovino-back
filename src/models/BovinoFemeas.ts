import { 
    Entity, 
    Column, 
    OneToOne, 
    JoinColumn,
    PrimaryColumn, 
} from "typeorm";
import { Exclude } from "class-transformer";
import Bovino from "./Bovino";

@Entity("bovino_femeas")
class BovinoFemeas {
    @Exclude()
    @PrimaryColumn("uuid")
    public id!: string;

    @Column("date", { nullable: true })
    public prenhez!: Date | null;

    @Column("date", { nullable: true })
    public ultimo_parto!: Date | null;

    @OneToOne(() => Bovino, { eager: false, primary: true, onDelete: "CASCADE" })
    @JoinColumn({ name: 'id', referencedColumnName: 'id' })
    public bovino!: Bovino;
}

export default BovinoFemeas;