# CAAC 训练舱

本地优先、手机可用的 CAAC 视距内无人机 PWA 刷题工具。

## 启动

在 PowerShell 中运行：

```powershell
.\start.ps1
```

然后访问 `http://127.0.0.1:4173`。

在线版本：[https://s-xxxd.github.io/CAAC/](https://s-xxxd.github.io/CAAC/)

## 题库

- 理论题：743 道
- 综合问答：179 道
- 总计：922 道

重新生成题库：

```powershell
python .\scripts\extract_questions.py
```

学习记录保存在当前浏览器的 `localStorage` 中，可在“设置”页面导出或恢复。
