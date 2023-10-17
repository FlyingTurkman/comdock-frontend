import style from "@/layout/ContentLists.module.sass";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Alert from "../basics/Alert";

const PersonsList = ({ content }) => {
  return (
    <div>
      {content &&
        content.data.map((item) => {
          return (
            <Link href={"/persons/" + item.id} key={item.id}>
              <div className={`${style.listItem} rounded-lg`}>
                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                  <div className="w-5">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                </div>
                <div className={`${style.listContent} flex-auto`}>
                  <p className={`${style.summary}`}>
                    {item.attributes.first_name +
                      " " +
                      item.attributes.sir_name}{" "}
                  </p>
                  <p className={`${style.meta}`}>{item.attributes.city}</p>
                </div>
              </div>
            </Link>
          );
        })}
      {content?.data?.length == 0 ? (
        <Alert theme="info">
          <p>
            Es gibt keine Einträge, die in dieser Ansicht gezeigt werden
            könnten.
          </p>
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
};
export default PersonsList;
