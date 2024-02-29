/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 01/03/2024 - 01:25:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/03/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";

import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import StatCard from "../../Components/StatsCard/index.js";
import { stats } from "../../Config/Data";
import { CChart } from "@coreui/react-chartjs";
import { SelectBox } from "../../Components/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import { BASE_URL } from "../../Api/apiConfig.js";

export const Dashboard = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {

    document.title = 'SicknWell | Dashboard';

    document.querySelector('.loaderBox').classList.remove("d-none");
    document.title = 'SicknWell | Dashboard';
    const LogoutData = localStorage.getItem('login');

    fetch(`${BASE_URL}/get_stats/`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${LogoutData}`
        },
      }
    )

      .then(response =>
        response.json()
      )
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data)
        setStatistics(data)
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })

  }, []);


  const optionData = [
    {
      code: 0,
      name: 'Monthly'
    },
    {
      code: 1,
      name: 'Yearly'
    }
  ]


  console.log(statistics)

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row">
                  <div className="col-xl-4 col-md-6 stats mb-4">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{statistics?.total_users}</h3>
                          <p className="statsText">Total Users</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          100%
                          <FontAwesomeIcon
                            icon={faArrowCircleUp}
                            className="me-2 redColor"
                          />


                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats mb-4">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{statistics?.total_active_subscriptions}</h3>
                          <p className="statsText">Active Subsciptions</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          100%
                          <FontAwesomeIcon
                            icon={faArrowCircleUp}
                            className="me-2 redColor"
                          />


                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats mb-4">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{statistics?.total_company_plan_users}</h3>
                          <p className="statsText">Company Plan Users</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          100%
                          <FontAwesomeIcon
                            icon={faArrowCircleUp}
                            className="me-2 redColor"
                          />


                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats mb-4">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{statistics?.total_couple_plan_users}</h3>
                          <p className="statsText">Couple Plan Users</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          100%
                          <FontAwesomeIcon
                            icon={faArrowCircleUp}
                            className="me-2 redColor"
                          />


                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats mb-4">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{statistics?.total_employees_users}</h3>
                          <p className="statsText">Total Employees</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          100%
                          <FontAwesomeIcon
                            icon={faArrowCircleUp}
                            className="me-2 redColor"
                          />


                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats mb-4">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{statistics?.total_family_plan_users}</h3>
                          <p className="statsText">Family Plan Users</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          100%
                          <FontAwesomeIcon
                            icon={faArrowCircleUp}
                            className="me-2 redColor"
                          />


                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats mb-4">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{statistics?.total_incomplete_subscriptions}</h3>
                          <p className="statsText">Incomplete Subsciptions</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          100%
                          <FontAwesomeIcon
                            icon={faArrowCircleUp}
                            className="me-2 redColor"
                          />


                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats mb-4">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{statistics?.total_individual_plan_users}</h3>
                          <p className="statsText">Individual Plan Users</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          100%
                          <FontAwesomeIcon
                            icon={faArrowCircleUp}
                            className="me-2 redColor"
                          />


                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-md-6 stats mb-4">
                    <div className="statsCard">
                      <div className="statsContent">
                        <div className="statsData">
                          <h3 className="statsNumber">{statistics?.total_subscriptions}</h3>
                          <p className="statsText">Total Subsciptions</p>
                        </div>
                      </div>
                      <div className="statsChange">
                        <p>
                          100%
                          <FontAwesomeIcon
                            icon={faArrowCircleUp}
                            className="me-2 redColor"
                          />


                        </p>
                        <p>Since last week</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          {/* <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="d-flex flex-wrap justify-content-between">
                  <h3 className="mainTitle">Total Users</h3>
                  <SelectBox selectClass="mainInput" name="Monthly" required option={optionData}

                  />
                </div>
                <div className="graph-wrapper">
                  <CChart
                    type="line"
                    height="90"
                    options={{
                      scales: {
                        y: {
                          suggestedMin: 0,
                          suggestedMax: 40,
                        },
                      },
                    }}
                    data={{
                      labels: ["Nov 2010", "March 2011", "July 2012", "Augest 2013", "Augest 2014"],
                      tension: "0.5",
                      datasets: [
                        {
                          label: "Active Users",

                          backgroundColor: "rgb(0 41 59 / 81%)",
                          borderColor: "#00293B",
                          pointBackgroundColor: "#00293B",
                          pointBorderColor: "#00293B",
                          borderWidth: 1,
                          data: [35, 30, 35, 30, 35],
                          tension: 0.5,
                        },
                        {
                          label: "Inactive Users",
                          backgroundColor: "rgb(1 22 215 / 81%)",
                          borderColor: "#0116d7",
                          pointBackgroundColor: "#0116d7",
                          borderWidth: 1,
                          pointBorderColor: "#0116d7",
                          data: [30, 35, 30, 35, 30],
                          tension: 0.5,
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </DashboardLayout>
    </>
  );
};
