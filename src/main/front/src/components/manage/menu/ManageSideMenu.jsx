import { useNavigate } from "react-router-dom";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import {
  Create,
  EmojiPeople,
  EventNote,
  QuestionMark,
  ShoppingCart,
} from "@mui/icons-material";

export default function ManageSideMenu() {
  const navigate = useNavigate();
  return (
    <Paper className="manageSidePaper" sx={{ width: "200px" }}>
      <MenuList>
        <MenuItem onClick={() => navigate("/manage/product")}>
          <ListItemIcon>
            <Create fontSize="small" />
          </ListItemIcon>
          <ListItemText>상품 관리</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/manage/event")}>
          <ListItemIcon>
            <EventNote fontSize="small" />
          </ListItemIcon>
          <ListItemText>이벤트 관리</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/manage/faq")}>
          <ListItemIcon>
            <QuestionMark fontSize="small" />
          </ListItemIcon>
          <ListItemText>FAQ 관리</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => navigate("/manage/purchase")}>
          <ListItemIcon>
            <ShoppingCart fontSize="small" />
          </ListItemIcon>
          <ListItemText>구매내역 관리</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/manage/user")}>
          <ListItemIcon>
            <EmojiPeople fontSize="small" />
          </ListItemIcon>
          <ListItemText>회원 관리</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
