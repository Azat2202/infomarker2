import prisma from "@/app/lib/db/prisma";
import { createReport, recreateAgentOccurrences } from "@/app/lib/db/report";
import { createForeignAgent } from "@/app/lib/db/foreignAgent";

const samples = {
    "people": [
        "Иванов Сергей Петрович",
        "Петров Николай Александрович",
        "Сидоров Михаил Владимирович",
        "Кузнецов Дмитрий Николаевич",
        "Смирнов Александр Михайлович",
        "Попов Иван Сергеевич",
        "Лебедев Владимир Иванович",
        "Козлов Петр Дмитриевич",
        "Иванова Ольга Сергеевна",
        "Петрова Анна Николаевна"
    ],
    "organizations": [
        "Исламское государство",
        "Федеральный государственный театр юного зрителя",
        "Фирма Разработок",
        "Корпорация Инноваций",
        "Ассоциация Проектов",
        "Концерн Систем",
        "Группа Услуг",
        "Холдинг Программ",
        "Трест Решений",
        "Компания Инноваций",
        "Корпорация Систем",
        "Республиканская общественная школа искусств 'Новые Горизонты'",
        "Национальная молодежная лига творчества 'Радуга'",
        "Государственный молодежный театр 'Звездный свет'",
        "Международный центр культурного развития 'Гармония'",
        "Общественная академия талантов 'Солнечный круг'",
        "Федерация художественных кружков 'Вдохновение'",
        "Культурно-просветительное объединение 'АртПланета'",
        "Региональный детский хор 'Сказка'",
        "Объединение творческой молодежи 'Энергия идеи'",
        "Детско-юношеский центр искусств 'Волшебство'"
    ]
}

async function main() {
    await prisma.foreignAgent.deleteMany();
    for (let person of samples.people) {
        await createForeignAgent({
            name: person,
            type: "PERSON",
        })
    }
    for (let organization of samples.organizations) {
        await createForeignAgent({
            name: organization,
            type: "ORGANISATION",
        });
    }
    const reports = await prisma.report.findMany();
    await Promise.all(
        reports.map(async report => recreateAgentOccurrences(report.id))
    );
    console.log("Seeding completed");
}

main().then(() => prisma.$disconnect()).catch(err => {
    console.log(err);
    prisma.$disconnect();
})