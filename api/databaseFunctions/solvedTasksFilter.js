/**
 * Created by alber_000 on 6/1/2016.
 * Updated by luka on 6/6/2016.
 */

var filter=require('./genericFilter');

function filterSolvedTasks(req,res)
{
    var bindvariables={
        case1:{
            hassolution: req.body.hasSolution,
            task_name: req.body.task_name,
            date1: req.body.date1,
            date2: req.body.date2,
            page: parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case2: {
            hassolution: req.body.hasSolution,
            task_name: req.body.task_name,
            page: parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case3: {
            hassolution: req.body.hasSolution,
            date1: req.body.date1,
            date2: req.body.date2,
            page: parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case4: {
            hassolution: req.body.hasSolution
        },
        case5: {
            task_name: req.body.task_name,
            date1: req.body.date1,
            date2: req.body.date2,
            page: parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case6: {
            task_name: req.body.task_name,
            page: parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case7: {
            date1: req.body.date1,
            date2: req.body.date2,
            page: parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        }
    };

    var select=[];
    if(req.body.hasSolution!='' && req.body.task_name!='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM(" +
            "SELECT task_name, completeddate,hassolution,solution,ROWNUM RN FROM(" +
            "SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  " +
            "where task_name= :task_name and hasSolution= :hasSolution and " +
            "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and " +
            "TO_DATE(:date2,'DD/MM/YY') ORDER BY TASK_ID ASC) " +
            "where ROWNUM<=:page*:rowsToFetch) " +
            "WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case1);
    }
    else if(req.body.hasSolution!='' && req.body.task_name!='' && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM(" +
            "SELECT task_name, completeddate,hassolution,solution,ROWNUM RN FROM(" +
            "SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  " +
            "where task_name= :task_name and hasSolution= :hasSolution ORDER BY TASK_ID ASC) " +
            "where ROWNUM<=:page*:rowsToFetch) " +
            "WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case2);
    }
    else if(req.body.hasSolution!='' && req.body.task_name=='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM(" +
            "SELECT task_name, completeddate,hassolution,solution,ROWNUM RN FROM(" +
            "SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  " +
            "where hasSolution= :hasSolution and TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and " +
            "TO_DATE(:date2,'DD/MM/YY') ORDER BY TASK_ID ASC) " +
            "where ROWNUM<=:page*:rowsToFetch) " +
            "WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case3);
    }
    else if(req.body.hasSolution!=''  && req.body.task_name=='' && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM(" +
            "SELECT task_name, completeddate,hassolution,solution,ROWNUM RN FROM(" +
            "SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW " +
            "where hasSolution= :hasSolution ORDER BY TASK_ID ASC) " +
            "where ROWNUM<=:page*:rowsToFetch) " +
            "WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case4);
    }
    else if(req.body.hasSolution=='' && req.body.task_name!='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM(" +
            "SELECT task_name, completeddate,hassolution,solution,ROWNUM RN FROM(" +
            "SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW " +
            "where task_name= :task_name and TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and " +
            "TO_DATE(:date2,'DD/MM/YY') ORDER BY TASK_ID ASC) " +
            "where ROWNUM<=:page*:rowsToFetch) " +
            "WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case5);
    }
    else if(req.body.hasSolution==''  && req.body.task_name!=''  && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM(" +
            "SELECT task_name, completeddate,hassolution,solution,ROWNUM RN FROM(" +
            "SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW " +
            "where task_name= :task_name ORDER BY TASK_ID ASC) " +
            "where ROWNUM<=:page*:rowsToFetch) " +
            "WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case6,parseInt(req.body.max));
    }
    else if(req.body.hasSolution==''  && req.body.task_name=='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM(" +
            "SELECT task_name, completeddate,hassolution,solution,ROWNUM RN FROM(" +
            "SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW " +
            "where TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and " +
            "TO_DATE(:date2,'DD/MM/YY') ORDER BY TASK_ID ASC) " +
            "where ROWNUM<=:page*:rowsToFetch) " +
            "WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case7,parseInt(req.body.max));
    }
    else if(req.body.hasSolution=='' && req.body.task_name=='' && req.body.date1=='' && req.body.date2=='') {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM(" +
            "SELECT task_name, completeddate,hassolution,solution,ROWNUM RN FROM(" +
            "SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW ORDER BY TASK_ID ASC) " +
            "where ROWNUM<=:page*:rowsToFetch) WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],{},parseInt(req.body.max));
    }
    else{
        res.send("Error");
        console.log("try inputting again");
    }
}

module.exports=filterSolvedTasks;
