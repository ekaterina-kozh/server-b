package com.company;

import java.sql.SQLException;
import java.util.Scanner;


public class Main {
   private static String login="";
    private static String password="";
    private static String posib="";


    public static void main(String[] args) throws SQLException {
	// write your code here
        Scanner in = new Scanner(System.in);


        System.out.println("**************************************************");
        System.out.println("********Информационная ситема телеателье**********");
        System.out.println("**************************************************");

        System.out.println("\n1. Авторизация");
        System.out.println("2. Регистрация");
        System.out.print("Ваш ответ: ");
        String choice = in.next();

        ConnectionClass cl = new ConnectionClass();
        cl.setConnetion();

       
        String []mass = cl.ResultShow("select itog from vedom;"); //оценки с таблицы ведомости
        int arr[] = new int[mass.length];
        for (int i = 0; i < mass.length; i++) {
            arr[i] = Integer.parseInt(mass[i]);
        }


        String []str = cl.ResultShow(" select sername from vedom;"); //фамилии учеников с таблицы ведомости

        for (int i=0; i<str.length; i++){
            System.out.format("%-16s", str[i]);
            for(int u = 1; u<=arr[i];u++){
                System.out.print("*");
            }
            System.out.println();
        }




        if (choice.equals("1")){
            System.out.println("\n____________________________\n\t\tАвторизация");
            while (true) {
                System.out.print("Логин:  ");
                login = in.next();
                System.out.println();
                System.out.print("Пароль:  ");
                password = in.next();
                System.out.println("____________________________");

                String string = "select count(login), login, password, posib from person where (login='" + login + "' and password='" + password + "');";
                String[] resultArr = cl.ResultShow(string);

                if (resultArr[0].equals("0")) {
                    System.out.println("Вы ввели неправильно");
                } else {
                    if (resultArr[3].equals("администратор")){
                        Administrator admin = new Administrator();
                        break;
                    }
                    if (resultArr[3].equals("сотрудник")){
                        Worker worker = new Worker();
                        break;
                    }
                }
            }

        }
     else if (choice.equals("2")) {
            System.out.println("\n____________________________\n\t\tРегистрация");

            String ch = "";
            System.out.print("Логин:  ");
            login = in.next();
            System.out.println();
            System.out.print("Пароль:  ");
            password = in.next();
            while (true) {
                System.out.print("1. Сотрудник\t2. Администратор  \n");
            ch = in.next();
            if (ch.equals("1")) {
                posib = "сотрудник";
                break;
            } else if (ch.equals("2")) {
                posib = "администратор";
                break;
            } else System.out.println("Введите 1 или 2");
            }
            System.out.println("____________________________");


            cl.ResultUpdate("insert into person (login, password, posib) values ('"+ login + "', '"+ password+"', '" + posib + "');");
     }
     else System.out.println("Введите 1 или 2");

    }
}
