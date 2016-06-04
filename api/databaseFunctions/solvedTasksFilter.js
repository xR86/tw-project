/**
 * Created by alber_000 on 6/1/2016.
 */

var filter=require('./genericFilter');

function filterSolvedTasks(req,res)
{
    var bindvariables={
        case1:{
            hassolution: req.body.hasSolution,
            task_name: req.body.task_name,
            date1: req.body.date1,
            date2: req.body.date2
        },
        case2: {
            hassolution: req.body.hasSolution,
            task_name: req.body.task_name
        },
        case3: {
            hassolution: req.body.hasSolution,
            date1: req.body.date1,
            date2: req.body.date2
        },
        case4: {
            hassolution: req.body.hasSolution
        },
        case5: {
            task_name: req.body.task_name,
            date1: req.body.date1,
            date2: req.body.date2
        },
        case6: {
            task_name: req.body.task_name
        },
        case7: {
            date1: req.body.date1,
            date2: req.body.date2
        }
    };

    var select=[];
    if(req.body.hasSolution!='' && req.body.task_name!='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  where task_name= :task_name and hasSolution= :hasSolution and "+
        "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case1,parseInt(req.body.max));
    }
    else if(req.body.hasSolution!='' && req.body.task_name!='' && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  where task_name= :task_name and hasSolution= :hasSolution");
        filter.filterBy(req,res,select[0],bindvariables.case2,parseInt(req.body.max));
    }
    else if(req.body.hasSolution!='' && req.body.task_name=='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT task_name,completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  where hasSolution= :hasSolution and"+
            " TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case3,parseInt(req.body.max));
    }
    else if(req.body.hasSolution!=''  && req.body.task_name=='' && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  where hasSolution= :hasSolution");
        filter.filterBy(req,res,select[0],bindvariables.case4,parseInt(req.body.max));
    }
    else if(req.body.hasSolution=='' && req.body.task_name!='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  where task_name= :task_name and " +
            "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case5,parseInt(req.body.max));
    }
    else if(req.body.hasSolution==''  && req.body.task_name!=''  && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  where task_name= :task_name ");
        filter.filterBy(req,res,select[0],bindvariables.case6,parseInt(req.body.max));
    }
    else if(req.body.hasSolution==''  && req.body.task_name=='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW  where " +
            "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case7,parseInt(req.body.max));
    }
    else if(req.body.hasSolution=='' && req.body.task_name=='' && req.body.date1=='' && req.body.date2=='') {
        select.push("SELECT task_name, completeddate,hassolution,solution FROM SOLVEDTASKSVIEW");
        filter.filterBy(req,res,select[0],{},parseInt(req.body.max));
    }
    else{
        res.redirect('/datafiltering/solvedTasksFilter');
        console.log("try inputting again");
    }
}

module.exports=filterSolvedTasks;