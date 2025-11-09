import { InputWithIcon } from "@/components";
import { useUsers } from "@/hooks";
import { DashboardLayout } from "@/layouts";
import { Loader, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const { users, isFetchingUsers } = useUsers();
  const [search, setSearch] = useState("");
  const filteredUsers = users?.filter((user) =>
    user?.email.toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate()
  const openUserDetails = (email: string)=>{
    navigate(`/users/${email}`)
  }
  return (
    <>
      <DashboardLayout title="User Management">
        <InputWithIcon
          icon={<Search />}
          type="text"
          placeholder="Search user by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isFetchingUsers && (
          <div className="">
            <div className="btn text-muted text-sm">
              <Loader size={20} className="animate-spin" /> Fetching...
            </div>
          </div>
        )}

        {!isFetchingUsers && (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {filteredUsers.map((x, y) => (
              <div
                key={y}
                onClick={()=> openUserDetails(x.email)}
                className="bg-background dark:bg-secondary cursor-pointer border border-primary/10 p-4 rounded-xl shadow-2xl shadow-primary/10 flex items-center gap-4"
              >
                <div className="h-20 w-20 overflow-hidden rounded-full bg-primary">
                  <img
                    src={`https://api.dicebear.com/9.x/micah/svg?seed=${x?.name}`}
                    alt="avatar"
                    className="h-full w-full object-fit-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium"> {x.name} </p>
                  <p className="text-sm text-muted"> {x.email} </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default Users;
