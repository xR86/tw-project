/**
 * Created by alber_000 on 6/1/2016.
 */

var filter=require('./genericFilter');

function filterSolvedTasks(req,res)
{
    var bindvariables={
        case1: {
            hassolution: req.body.hasSolution,
            task_name: req.body.task_name,
            completeddate: req.body.completeddate
        },
        case2: {
            hassolution: req.body.hasSolution,
            task_name: req.body.task_name
        },
        case3: {
            hassolution: req.body.hasSolution,
            completeddate: req.body.completeddate
        },
        case4: {
            hassolution: req.body.hasSolution
        },
        case5: {
            task_name: req.body.task_name,
            completeddate: req.body.completeddate
        },
        case6: {
            task_name: req.body.task_name
        },
        case7: {
            completeddate:req.body.completeddate
        }
    };

    var select=[];
    if(req.body.hasSolution!='' &&  req.body.completeddate!='' && req.body.task_name!='')
    {
        select.push("SELECT * FROM SOLVEDTASKSVIEW  where task_name= :task_name and hasSolution= :hasSolution and"+
            " TO_DATE(TRUNC(completeddate),'DD/MM/YY')=TO_DATE(:completeddate,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case1);
    }
    else if(req.body.hasSolution!='' &&  req.body.completeddate=='' && req.body.task_name!='')
    {
        select.push("SELECT * FROM SOLVEDTASKSVIEW  where task_name= :task_name and hasSolution= :hasSolution");
        filter.filterBy(req,res,select[0],bindvariables.case2);
    }
    else if(req.body.hasSolution!='' && req.body.completeddate!='' && req.body.task_name=='')
    {
        select.push("SELECT * FROM SOLVEDTASKSVIEW  where hasSolution= :hasSolution and"+
            " TO_DATE(TRUNC(completeddate),'DD/MM/YY')=TO_DATE(:completeddate,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case3);
    }
    else if(req.body.hasSolution!='' && req.body.completeddate=='' && req.body.task_name=='')
    {
        select.push("SELECT * FROM SOLVEDTASKSVIEW  where hasSolution= :hasSolution");
        filter.filterBy(req,res,select[0],bindvariables.case4);
    }
    else if(req.body.hasSolution=='' && req.body.completeddate!='' && req.body.task_name!='')
    {
        select.push("SELECT * FROM SOLVEDTASKSVIEW  where TO_DATE(TRUNC(completeddate),'DD/MM/YY')=TO_DATE(:completeddate,'DD/MM/YY') and task_name= :task_name ");
        filter.filterBy(req,res,select[0],bindvariables.case5);
    }
    else if(req.body.hasSolution=='' && req.body.completeddate=='' && req.body.task_name!='')
    {
        select.push("SELECT * FROM SOLVEDTASKSVIEW  where task_name= :task_name ");
        filter.filterBy(req,res,select[0],bindvariables.case6);
    }
    else if(req.body.hasSolution=='' && req.body.completeddate!='' && req.body.task_name=='')
    {
        select.push("SELECT * FROM SOLVEDTASKSVIEW  where TO_DATE(TRUNC(completeddate),'DD/MM/YY')=TO_DATE(:completeddate,'DD/MM/YY')");
        filter.filterBy(req,res,select[0],bindvariables.case7);
    }
    else if(req.body.hasSolution=='' && req.body.completeddate=='' && req.body.task_name=='') {
        select.push("SELECT * FROM SOLVEDTASKSVIEW");
        filter.filterBy(req,res,select[0],{});
    }
    else{ //nu cred ca se poate ajunge in else-ul asta 
        res.redirect('/datafiltering/solvedTasksFilter');
        console.log("try inputting again");
    }
}

module.exports=filterSolvedTasks;