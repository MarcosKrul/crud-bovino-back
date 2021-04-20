import { 
    Entity, 
    Column, 
    OneToOne, 
    JoinColumn, 
    PrimaryGeneratedColumn 
} from "typeorm";
import BovinoFemeas from "./BovinoFemeas";

@Entity("bovino")
class Bovino {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;
    
    @Column("varchar", { length: 20, nullable: false })
    public nome!: string;

    @Column("varchar", { length: 8, nullable: false })
    public brinco!: string;

    @Column("varchar", { length: 8, nullable: true })
    public brinco_mae!: string | null;

    @Column("varchar", { length: 8, nullable: true })
    public brinco_pai!: string | null;

    @Column("varchar", { length: 15, nullable: false })
    public situacao!: string;

    @Column("varchar", { length: 15, nullable: false })
    public raca!: string;

    @Column("varchar", { length: 1, nullable: false })
    public sexo!: string;

    @Column("date")
    public nascimento!: Date;

    @OneToOne(() => BovinoFemeas, { eager: true })
    @JoinColumn({ name: 'id', referencedColumnName: 'id' })
    public femea!: BovinoFemeas;
}

export default Bovino;