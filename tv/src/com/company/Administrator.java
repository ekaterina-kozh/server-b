package com.company;

import java.sql.SQLException;
import java.util.Scanner;

import static com.company.ConnectionClass.ShowTable;

public class Administrator {
    public Administrator() throws SQLException {
        Scanner in = new Scanner(System.in);
        ConnectionClass cl = new ConnectionClass();
        while (true) {

            System.out.println("\n____________________________\n\t\tАдминистратор");
            System.out.println("\tМеню");
            System.out.println("1. Просмотреть");
            System.out.println("2. Добавить");
            System.out.println("3. Удалить ");
            System.out.println("4. Редактировать");
            System.out.println("5. Выход");

            String choice = in.next();
//вывод
            if (choice.equals("1")) {
                System.out.println("1. Сотрудник");
                System.out.println("2. Мастер");
                System.out.println("3. Клиент");
                String choice2 = in.next();
                if (choice2.equals("1")) {
                    ShowTable("worker");
                }
                if (choice2.equals("2")) {
                    ShowTable("master");
                }
                if (choice2.equals("3")) {
                    ShowTable("client");
                }

            }
//добавление
            if (choice.equals("2")) {
                System.out.println("1. Сотрудник");
                System.out.println("2. Мастер");
                String choice2 = in.next();
                if (choice2.equals("1")) {
                    System.out.print("Фамилия: ");
                    String surname = in.next();
                    System.out.print("Имя: ");
                    String name = in.next();
                    System.out.print("Отчество: ");
                    String lastname = in.next();
                    System.out.print("Дата рождения: ");
                    String dateb = in.next();
                    System.out.print("Должность: ");
                    String place = in.next();

                    cl.ResultUpdate("insert into worker (surname, name, lastname, dateb, place) values ('" + surname+ "', '" + name + "', '" + lastname + "', '" + dateb + "', '"+ place + "');");
                    System.out.print("Успешно! ");
                }
                if (choice2.equals("2")) {
                    System.out.print("ФИО: ");
                    String fio = in.next();
                    System.out.print("Телефон: ");
                    String phone = in.next();
                    System.out.print("Заявка: ");
                    String request = in.next();

                    cl.ResultUpdate(" insert into master (fio, phone, request) values ('" + fio + "', '" + phone + "', '" + request + "');");

                    System.out.print("Успешно! ");
                }



            }
//удаление
            if (choice.equals("3")) {
                System.out.println("1. Сотрудник");
                System.out.println("2. Мастер");
                String choice2 = in.next();
                if (choice2.equals("1")) {
                    System.out.print("Какую запись удалить?  ");
                    String num = in.next();

                    cl.ResultUpdate("DELETE FROM worker WHERE id = '" + num + "'");
                    System.out.print("Успешно! ");
                }
                if (choice2.equals("2")) {
                    System.out.print("Какую запись удалить?  ");
                    String num = in.next();

                    cl.ResultUpdate("DELETE FROM master WHERE id = '" + num + "'");

                    System.out.print("Успешно! ");
                }

            }
//редактировать
            if (choice.equals("4")) {
                System.out.println("1. Сотрудник");
                System.out.println("2. Мастер");
                String choice2 = in.next();
                if (choice2.equals("1")) {
                    System.out.print("Какую запись редактировать?  ");
                    String num = in.next();
                    System.out.print("1. Фамилия \n");
                    System.out.print("2. Имя \n");
                    System.out.print("3. Отчество \n");
                    System.out.print("4. Должность \n");
                    String num2 = in.next();
                    System.out.print("Введите новое значение \n");
                    String text = in.next();

                    if (num2.equals("1")){
                    cl.ResultUpdate("UPDATE worker SET surname='" + text + "' WHERE id=" + num);
                    }
                    if (num2.equals("2")){
                        cl.ResultUpdate("UPDATE worker SET name='" + text + "' WHERE id=" + num);
                    }
                    if (num2.equals("3")){
                        cl.ResultUpdate("UPDATE worker SET lastname='" + text + "' WHERE id=" + num);
                    }
                    if (num2.equals("4")){
                        cl.ResultUpdate("UPDATE worker SET dateb='" + text + "' WHERE id=" + num);
                    }
                    if (num2.equals("5")){
                        cl.ResultUpdate("UPDATE worker SET place='" + text + "' WHERE id=" + num);
                    }

                    System.out.print("Успешно! ");
                }
                if (choice2.equals("2")) {
                    System.out.print("Какую запись редактировать?  \n");
                    String num = in.next();

                    System.out.print("1. ФИО \n");
                    System.out.print("2. Телефон \n");
                    System.out.print("3. Заявка \n");
                    String num2 = in.next();
                    System.out.print("Введите новое значение \n");
                    String text = in.next();

                    if (num2.equals("1")){
                        cl.ResultUpdate("UPDATE master SET fio='" + text + "' WHERE id=" + num);
                    }
                    if (num2.equals("2")){
                        cl.ResultUpdate("UPDATE master SET phone='" + text + "' WHERE id=" + num);
                    }
                    if (num2.equals("3")){
                        cl.ResultUpdate("UPDATE master SET request='" + text + "' WHERE id=" + num);
                    }

                    System.out.print("Успешно! ");
                }

            }

            if (choice.equals("5")) {
                break;
            }

        }

    }
}
