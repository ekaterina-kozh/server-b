package com.company;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ConnectionClass {

    private static String userName = "root";
    private static String password = "root";
    private static String connectionURL = "jdbc:mysql://localhost:3306/tvprogram?verifyServerCertificate=false&useSSL=false&useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";


    //соединение и подключение
    public static Statement setConnetion(){
       try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException ex) {
            ex.printStackTrace();
        }
        Connection con = null;
        try {
            con = DriverManager.getConnection(connectionURL, userName, password);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }

        Statement st = null;

        try {
            st = con.createStatement();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return st;
    }

    //вывод содержимого из sql в массив
    public String[] ResultShow (String str) throws SQLException {
        ResultSet rs = setConnetion().executeQuery(str);
        ArrayList<String> result = new ArrayList<String>();

        while (rs.next()) {
            for (int i = 1; i <= CountColum(str); i++) {
                result.add(rs.getString(i));
            }
        }

         String[] resultArr = new String[result.size()];
            resultArr = result.toArray(resultArr);
        return resultArr;
    }



    //вывод одной записи в строку
    public String ResultShowItem (String str, int i) throws SQLException {
        ResultSet rs = setConnetion().executeQuery(str);

        String result = "";
        while (rs.next()) {
            result = rs.getString(i);
        }

        return result;
    }

    //добавление записи
    public void ResultUpdate (String str) throws SQLException {
        setConnetion().executeUpdate(str);
    }

    //колличество столбцов
    public int CountColum(String str) throws SQLException {
        ResultSet rs = setConnetion().executeQuery(str);
        return rs.getMetaData().getColumnCount();
    }

    //колличество строк
    public int CountRows (String str, String[] resultArr) throws SQLException {
        return resultArr.length/CountColum(str);
    }

    //вывод названия колонок в массив
    public static String[] getColumName (String str) throws SQLException {
        ResultSet rs = setConnetion().executeQuery(str);
        ArrayList<String> result = new ArrayList<String>();

        while (rs.next()) {
            result.add(rs.getString(1));
        }

        String[] resultArr = new String[result.size()];
        resultArr = result.toArray(resultArr);
        return resultArr;
    }

    ////вывод таблицы
    public static void ShowTable(String str) throws SQLException {
        String strnew1 = "select * from " +str;
        TableGenerator tableGenerator = new TableGenerator();
        List<String> headersList = new ArrayList<>();

        String []arr = getColumName("show columns from " + str);
        ResultSet rs = setConnetion().executeQuery(strnew1);
        List<List<String>> rowsList = new ArrayList<>();
        for (int i = 0; i < arr.length; i++) {
            headersList.add(arr[i]);
        }

        while (rs.next()) {
            List<String> row = new ArrayList<>();
            for (int i = 0; i < arr.length; i++){
                row.add(rs.getString(arr[i]));
            }
            rowsList.add(row);
        }
        System.out.println(tableGenerator.generateTable(headersList, rowsList));
    }

}
