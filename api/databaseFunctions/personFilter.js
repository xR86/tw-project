/**
 * Created by alber_000 on 6/1/2016.
 */
var filter=require('./genericFilter');

function personFilter(req,res)
{
    var bindvariables= {
        case1:
        {
            p_id:req.body.p_id,
            tasks_completed_counter:req.body.tasks_completed_counter,
            date1:req.body.date1,
            date2:req.body.date2,
            page: parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case2:
        {
            p_id:req.body.p_id,
            date1:req.body.date1,
            date2:req.body.date2,
            page:parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case3:
        {
            tasks_completed_counter:req.body.tasks_completed_counter,
            page:parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case4:
        {
            date1:req.body.date1,
            date2:req.body.date2,
            page:parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case5:
        {
            p_id:req.body.p_id,
            page:parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case6:
        {
            tasks_completed_counter:req.body.tasks_completed_counter,
            date1:req.body.date1,
            date2:req.body.date2,
            page:parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        },
        case7:
        {
            page:parseInt(req.body.page),
            rowsToFetch:parseInt(req.body.rowsToFetch)
        }
    };



    //console.log(typeof bindvariables.case7.page);
  //  console.log(bindvariables.case7.page);
  //  console.log(req.body.page);
  //  console.log(req.body.rowsToFetch);
 //   console.log(bindvariables.case7.rowsToFetch);
 //   console.log(typeof bindvariables.case7.rowsToFetch);


    var select=[];
    if(req.body.p_id!='' && req.body.tasks_completed_counter!='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM " +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN " +
            "FROM (SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where p_id= :p_id and tasks_completed_counter> :tasks_completed_counter and " +
            "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY') ORDER BY P_ID ASC)" +
            " where ROWNUM<=:page*:rowsToFetch) WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case1);
    }
    else if(req.body.p_id!='' && req.body.tasks_completed_counter=='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM" +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution," +
            "ROWNUM RN FROM(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where p_id= :p_id and " +
            "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY') ORDER BY P_ID ASC)" +
            " where ROWNUM<=:page*:rowsToFetch) WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case2);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter!='' && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM" +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN FROM(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where tasks_completed_counter> :tasks_completed_counter ORDER BY P_ID ASC) where ROWNUM<=:page*:rowsToFetch) WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case3);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter=='' && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution " +
            "FROM(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN " +
            "FROM(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM personView " +
            "ORDER BY P_ID ASC) WHERE ROWNUM<=:page*:rowsToFetch) WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req, res, select[0], bindvariables.case7);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter=='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM" +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN " +
            "FROM(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY') ORDER BY P_ID ASC) " +
            " where ROWNUM<=:page*:rowsToFetch) WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case4);
    }
    else if(req.body.p_id!='' && req.body.tasks_completed_counter=='' && req.body.date1=='' && req.body.date2=='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM (SELECT p_id, tasks_completed_counter, " +
            "tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN FROM(select p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, " +
            "hassolution,solution from personView where p_id= :p_id ORDER BY P_ID ASC) " +
            "where ROWNUM<=:page*:rowsToFetch) WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case5);
    }
    else if(req.body.p_id=='' && req.body.tasks_completed_counter!='' && req.body.date1!='' && req.body.date2!='')
    {
        select.push("SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution FROM " +
            "(SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution,ROWNUM RN " +
            "FROM (SELECT p_id, tasks_completed_counter, tasks_attempted_counter, completeddate, hassolution,solution" +
            " FROM personView where tasks_completed_counter> :tasks_completed_counter and " +
            "TO_DATE(TRUNC(completeddate),'DD/MM/YY') between TO_DATE(:date1,'DD/MM/YY') and TO_DATE(:date2,'DD/MM/YY') ORDER BY P_ID ASC)" +
            " where ROWNUM<=:page*:rowsToFetch) WHERE RN>(:page-1)*:rowsToFetch");
        filter.filterBy(req,res,select[0],bindvariables.case6);
    }
    else
    {
        res.send("error"); // TODO : handle exception properly
        console.log("try inputting again");
    }
}



module.exports=personFilter;