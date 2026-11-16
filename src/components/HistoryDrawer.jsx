import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  Chip,
  Tooltip,
} from "@mui/material";
import { X, Trash2, History, FileCode2 } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

export const HistoryDrawer = ({
  open,
  onClose,
  history,
  onSelect,
  onDelete,
  onClear,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          maxWidth: "100vw",
          backgroundColor: "#FFFFFF",
          borderLeft: "1px solid #E6E6E6",
          p: 0,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: "1px solid #E6E6E6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <History size={18} color="#2563EB" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              fontSize: "16px",
              color: "#000000",
              fontFamily: '"Rethink Sans", sans-serif',
            }}
          >
            Extraction History
          </Typography>
          <Chip
            size="small"
            label={history.length}
            sx={{
              height: 20,
              fontSize: "11px",
              backgroundColor: "#F1F5F9",
              color: "#0F172A",
              border: "1px solid #CBD5E1",
              borderRadius: "9999px",
              fontWeight: 600,
            }}
          />
        </Box>

        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: "#4D4D4D",
            "&:hover": { color: "#000000", backgroundColor: "#F5F5F5" },
          }}
        >
          <X size={18} />
        </IconButton>
      </Box>

      {/* List */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {history.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "60%",
              textAlign: "center",
              px: 3,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "9999px",
                backgroundColor: "#F5F5F5",
                border: "1px solid #E6E6E6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                color: "#4D4D4D",
              }}
            >
              <FileCode2 size={22} />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: "#000000",
                mb: 0.5,
                fontSize: "14.4px",
              }}
            >
              No extractions yet
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#4D4D4D", fontSize: "12.6px" }}
            >
              Previously extracted website design systems will be listed here.
            </Typography>
          </Box>
        ) : (
          <List
            disablePadding
            sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          >
            {history.map((item) => {
              const colors = item.tokens?.colors?.slice(0, 4) || [];
              const timeStr = item.extractedAt
                ? new Date(item.extractedAt).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Recent";

              return (
                <Box
                  key={item.id || item.url}
                  sx={{
                    p: 2,
                    borderRadius: "8px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E6E6E6",
                    transition:
                      "border-color 0.15s ease, box-shadow 0.15s ease",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#2563EB",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                    },
                  }}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                      <BrandLogo
                        url={item.url}
                        name={item.name}
                        size={32}
                        borderRadius="6px"
                        primaryColor={colors[0]?.hex || "#2563EB"}
                      />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            color: "#000000",
                            fontSize: "14.4px",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: "JetBrains Mono, monospace",
                            color: "#0F172A",
                            fontSize: "11px",
                            fontWeight: 500,
                            display: "block",
                          }}
                        >
                          {item.url}
                        </Typography>
                      </Box>
                    </Box>

                    <Tooltip title="Delete entry">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        sx={{
                          color: "#4D4D4D",
                          p: 0.5,
                          "&:hover": {
                            color: "#D92D20",
                            backgroundColor: "#FEE4E2",
                          },
                        }}
                      >
                        <Trash2 size={14} />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Swatches & Date */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 1.5,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 0.6 }}>
                      {colors.map((c, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            width: 14,
                            height: 14,
                            borderRadius: "9999px",
                            backgroundColor: c.hex,
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      ))}
                    </Box>

                    <Typography
                      variant="caption"
                      sx={{ color: "#4D4D4D", fontSize: "11.5px" }}
                    >
                      {timeStr}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </List>
        )}
      </Box>

      {/* Footer */}
      {history.length > 0 && (
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #E6E6E6",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={onClear}
            startIcon={<Trash2 size={14} />}
            sx={{
              borderRadius: "9999px",
              borderColor: "#E6E6E6",
              color: "#D92D20",
              backgroundColor: "#FFFFFF",
              fontSize: "13px",
              height: 38,
              "&:hover": {
                backgroundColor: "#FEE4E2",
                borderColor: "#D92D20",
              },
            }}
          >
            Clear History
          </Button>
        </Box>
      )}
    </Drawer>
  );
};
