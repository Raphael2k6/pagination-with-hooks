import React, { useEffect, useState, Fragment } from "react";
import "./Paginate.css";

const Paginate = (props) => {
  const limit = 5;
  const [pageStore, setPageStore] = useState(); //PageNumber, pageOffset
  useEffect(() => {
    if(props.onCurrentPage) {
      paginateNumberTrigger()
    }
  }, [props.onCurrentPage])

  const paginateNumberTrigger = () => {
    const page = []
    let mapper = props.onOffSet;
    for (let step = 0; step < limit; step++) {
      console.log(mapper)
      const newPostLimit =  step * 10 + props.onLimit;
      console.log(step * 10 + props.onLimit, step * props.onLimit)
      //console.log(mapper, props.onOffSet)
      page.push([
        step + props.onCurrentPage, 
        step === 0 ? props.onOffSet: mapper, 
        newPostLimit
      ])
      mapper = mapper + 10;
    } 

    console.log(page)
    setPageStore(page)
  }

  const triggerPageNumberView = (e) => {
    e.persist();
    console.log(e)
    const newPageNumber = e.currentTarget.dataset.pageNumber;
    const newPageOffset = e.currentTarget.dataset.pageOffset;
    const newPostLimit = e.currentTarget.dataset.postLimit;

    props.onSwitchPage(Number(newPageNumber), Number(newPageOffset), Number(newPostLimit))
  }

  const triggerPrevView = (e) => {
    e.persist();
    props.onPrevFunc(e)
  }
  const triggerNextView = (e) => {
    e.persist();
    props.onNextFunc(e)
  }

  return (
    <div className="paginate-sty-cover">
      <div className="pagin-block">
        <span onClick={triggerPrevView} style={{float: 'left'}}>Prev</span>&nbsp;
        <span onClick={triggerNextView} style={{float: 'right'}}>Next</span>&nbsp;
        {props.onCurrentPage > 3 ?
          <Fragment>
             &nbsp;
             <span onClick={triggerPageNumberView} className="pageClass" data-page-number="1" data-page-offset="0" data-post-limit="10">1</span>&nbsp;
             <span onClick={triggerPageNumberView} className="pageClass" data-page-number="2" data-page-offset="10" data-post-limit="20">2</span>&nbsp;
             <span onClick={triggerPageNumberView} className="pageClass" data-page-number="3" data-page-offset="20" data-post-limit="30">3</span>
             &nbsp;....
          </Fragment>
        :null
        }
        {pageStore? 
          pageStore.map(x => (
            <Fragment key={x[0]} >
                &nbsp;
                  <span onClick={triggerPageNumberView} className="pageClass" data-page-number={x[0]} data-page-offset={x[1]} data-post-limit={x[2]}>
                    {x[0]}
                  </span>
                &nbsp;
            </Fragment>
          ))
          : null
        }
      </div>
    </div>
  );
};

export default Paginate;
