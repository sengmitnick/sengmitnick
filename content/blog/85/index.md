---
mark: reprint
title: DoNet下使用Chart，代码设置并具备放大功能
categories: [technology]
date: 2016-10-12 14:51:29
tags: [DoNet,Chart]
author: SengMitnick
linktitle: "85"
comments: true
---
> 直接拖到Chart控件到你需要显示的地方，然后把控件名字改成chart即可。


  本文示例DEMO已上传到GitHub，点击[这里](https://github.com/smk17/ChartText)即可访问。

  本文示例最终效果：
<!--more-->
{{<img name="1.jpg" caption="图1" alt="图1">}}
{{<img name="2.jpg" caption="图2" alt="图2">}}
{{<img name="3.jpg" caption="图3" alt="图3">}}

直接上代码：
# 初始化
``` CSHARP
private void InitializeChart()
{
    chart.ChartAreas.Clear();
    chart.Series.Clear();

    #region 设置图表的属性  
    //图表的背景色  
    chart.BackColor = Color.FromArgb(211, 223, 240);
    //图表背景色的渐变方式  
    chart.BackGradientStyle = GradientStyle.TopBottom;
    //图表的边框颜色、  
    chart.BorderlineColor = Color.FromArgb(26, 59, 105);
    //图表的边框线条样式  
    chart.BorderlineDashStyle = ChartDashStyle.Solid;
    //图表边框线条的宽度  
    chart.BorderlineWidth = 2;
    //图表边框的皮肤  
    chart.BorderSkin.SkinStyle = BorderSkinStyle.Emboss;
    #endregion

    #region 设置图表的标题  
    Title title = new Title();
    //标题内容  
    title.Text = "折线图";
    //标题的字体  
    title.Font = new System.Drawing.Font("Microsoft Sans Serif", 12, FontStyle.Bold);
    //标题字体颜色  
    title.ForeColor = Color.FromArgb(26, 59, 105);
    //标题阴影颜色  
    title.ShadowColor = Color.FromArgb(32, 0, 0, 0);
    //标题阴影偏移量  
    title.ShadowOffset = 3;
    chart.Titles.Add(title);
    #endregion

    #region 设置图例的属性  
    //注意，需要把原来控件自带的图例删除掉  
    this.chart.Legends.Clear();

    Legend legend = new Legend("Default");
    legend.Alignment = StringAlignment.Center;
    legend.Docking = Docking.Bottom;
    legend.LegendStyle = LegendStyle.Column;
    this.chart.Legends.Add(legend);

    // Add header separator of type line  
    legend.HeaderSeparator = LegendSeparatorStyle.Line;
    legend.HeaderSeparatorColor = Color.Gray;

    LegendCellColumn firstColumn = new LegendCellColumn();
    firstColumn.ColumnType = LegendCellColumnType.SeriesSymbol;
    firstColumn.HeaderText = "Color";
    firstColumn.HeaderBackColor = Color.WhiteSmoke;
    chart.Legends["Default"].CellColumns.Add(firstColumn);

    // Add Legend Text column  
    LegendCellColumn secondColumn = new LegendCellColumn();
    secondColumn.ColumnType = LegendCellColumnType.Text;
    secondColumn.HeaderText = "Name";
    secondColumn.Text = "#LEGENDTEXT";
    secondColumn.HeaderBackColor = Color.WhiteSmoke;
    chart.Legends["Default"].CellColumns.Add(secondColumn);

    // Add AVG cell column  
    LegendCellColumn avgColumn = new LegendCellColumn();
    avgColumn.Text = "#AVG{N2}";
    avgColumn.HeaderText = "Avg";
    avgColumn.Name = "AvgColumn";
    avgColumn.HeaderBackColor = Color.WhiteSmoke;
    chart.Legends["Default"].CellColumns.Add(avgColumn);

    // Add Total cell column  
    LegendCellColumn totalColumn = new LegendCellColumn();
    totalColumn.Text = "#TOTAL{N1}";
    totalColumn.HeaderText = "Total";
    totalColumn.Name = "TotalColumn";
    totalColumn.HeaderBackColor = Color.WhiteSmoke;
    chart.Legends["Default"].CellColumns.Add(totalColumn);

    // Set Min cell column attributes  
    LegendCellColumn minColumn = new LegendCellColumn();
    minColumn.Text = "#MIN{N1}";
    minColumn.HeaderText = "Min";
    minColumn.Name = "MinColumn";
    minColumn.HeaderBackColor = Color.WhiteSmoke;
    chart.Legends["Default"].CellColumns.Add(minColumn);

    // Set Max cell column attributes  
    LegendCellColumn maxColumn = new LegendCellColumn();
    maxColumn.Text = "#MAX{N1}";
    maxColumn.HeaderText = "Max";
    maxColumn.Name = "MaxColumn";
    maxColumn.HeaderBackColor = Color.WhiteSmoke;
    chart.Legends["Default"].CellColumns.Add(maxColumn);

    #endregion

    #region 设置图表区属性  
    ChartArea chartArea = new ChartArea("Default");
    //设置Y轴刻度间隔大小  
    chartArea.AxisY.Interval = 5;
    //设置Y轴的数据类型格式  
    //chartArea.AxisY.LabelStyle.Format = "C";  
    //设置背景色  
    chartArea.BackColor = Color.FromArgb(64, 165, 191, 228);
    //设置背景渐变方式  
    chartArea.BackGradientStyle = GradientStyle.TopBottom;
    //设置渐变和阴影的辅助背景色  
    chartArea.BackSecondaryColor = Color.White;
    //设置边框颜色  
    chartArea.BorderColor = Color.FromArgb(64, 64, 64, 64);
    //设置阴影颜色  
    chartArea.ShadowColor = Color.Transparent;
    //设置X轴和Y轴线条的颜色  
    chartArea.AxisX.LineColor = Color.FromArgb(64, 64, 64, 64);
    chartArea.AxisY.LineColor = Color.FromArgb(64, 64, 64, 64);
    //开启次要Y轴
    chartArea.AxisY2.Enabled = AxisEnabled.True;
    //设置X轴和Y轴线条的宽度  
    chartArea.AxisX.LineWidth = 1;
    chartArea.AxisY.LineWidth = 1;
    chartArea.AxisY2.LineWidth = 1;
    //设置X轴和Y轴的标题  
    chartArea.AxisX.Title = "采集时间";
    chartArea.AxisY.Title = "温度值";
    chartArea.AxisY2.Title = "湿度值";
    //设置图表区网格横纵线条的颜色  
    chartArea.AxisX.MajorGrid.LineColor = Color.FromArgb(64, 64, 64, 64);
    chartArea.AxisY.MajorGrid.LineColor = Color.FromArgb(64, 64, 64, 64);
    chartArea.AxisY2.MajorGrid.LineColor = Color.FromArgb(64, 64, 64, 64);
    //设置图表区网格横纵线条的宽度  
    chartArea.AxisX.MajorGrid.LineWidth = 1;
    chartArea.AxisY.MajorGrid.LineWidth = 1;
    chartArea.AxisY2.MajorGrid.LineWidth = 1;
    //设置坐标轴刻度线不延长出来  
    chartArea.AxisX.MajorTickMark.Enabled = false;
    chartArea.AxisY.MajorTickMark.Enabled = false;
    chartArea.AxisY2.MajorTickMark.Enabled = false;
    //开启下面两句能够隐藏网格线条  
    //chartArea.AxisX.MajorGrid.Enabled = false;  
    //chartArea.AxisY.MajorGrid.Enabled = false;  
    //设置X轴的显示类型及显示方式  
    chartArea.AxisX.Interval = 0; //设置为0表示由控件自动分配  
    chartArea.AxisX.IntervalAutoMode = IntervalAutoMode.VariableCount;
    chartArea.AxisX.IntervalType = DateTimeIntervalType.Minutes;
    chartArea.AxisX.LabelStyle.IsStaggered = true;
    //chartArea.AxisX.MajorGrid.IntervalType = DateTimeIntervalType.Minutes;  
    //chartArea.AxisX.LabelStyle.IntervalType = DateTimeIntervalType.Minutes;  
    chartArea.AxisX.LabelStyle.Format = "yyyy-MM-dd HH:mm:ss";
    //设置文本角度  
    //chartArea.AxisX.LabelStyle.Angle = 45;  
    //设置文本自适应  
    chartArea.AxisX.IsLabelAutoFit = true;
    //设置X轴允许拖动放大  
    chartArea.CursorX.IsUserEnabled = true;
    chartArea.CursorX.IsUserSelectionEnabled = true;
    chartArea.CursorX.Interval = 0;
    chartArea.CursorX.IntervalOffset = 0;
    chartArea.CursorX.IntervalType = DateTimeIntervalType.Minutes;
    chartArea.AxisX.ScaleView.Zoomable = true;
    chartArea.AxisX.ScrollBar.IsPositionedInside = false;

    //设置中短线（还没看到效果）  
    //chartArea.AxisY.ScaleBreakStyle.Enabled = true;  
    //chartArea.AxisY.ScaleBreakStyle.CollapsibleSpaceThreshold = 47;  
    //chartArea.AxisY.ScaleBreakStyle.BreakLineStyle = BreakLineStyle.Wave;  
    //chartArea.AxisY.ScaleBreakStyle.Spacing = 2;  
    //chartArea.AxisY.ScaleBreakStyle.LineColor = Color.Red;  
    //chartArea.AxisY.ScaleBreakStyle.LineWidth = 10;  

    chart.ChartAreas.Add(chartArea);
    #endregion

    //线条2：主要曲线  
    Series tempSeries = new Series("Default");
    //设置线条类型  
    tempSeries.ChartType = SeriesChartType.Spline;
    //线条宽度  
    tempSeries.BorderWidth = 1;
    //阴影宽度  
    tempSeries.ShadowOffset = 0;
    //是否显示在图例集合Legends  
    tempSeries.IsVisibleInLegend = true;
    //线条上数据点上是否有数据显示  
    //series.IsValueShownAsLabel = true;
    //线条颜色  
    tempSeries.Color = Color.MediumPurple;
    //设置曲线X轴的显示类型  
    tempSeries.XValueType = ChartValueType.DateTime;
    //设置数据点的类型  
    tempSeries.MarkerStyle = MarkerStyle.Circle;
    //线条数据点的大小  
    tempSeries.MarkerSize = 5;
    //绑定到Y主轴
    tempSeries.YAxisType = AxisType.Primary;
    chart.Series.Add(tempSeries);

    //手动构造横坐标数据  
    DataTable dataTable = new DataTable();
    dataTable.Columns.Add("TheTime", typeof(DateTime)); //注意typeof  
    dataTable.Columns.Add("TheValue", typeof(double)); //注意typeof  
    Random random = new Random(); //随机数  
    DateTime dateTime = System.DateTime.Now;
    for (int n = 0; n < 3; n++)
    {
        dateTime = dateTime.AddSeconds(10);
        DataRow dr = dataTable.NewRow();
        dr["TheTime"] = dateTime;
        dr["TheValue"] = random.Next(0, 101);
        dataTable.Rows.Add(dr);
    }
    for (int n = 3; n < 1000; n++)
    {
        dateTime = dateTime.AddSeconds(30);
        DataRow dr = dataTable.NewRow();
        dr["TheTime"] = dateTime;
        dr["TheValue"] = random.Next(0, 101);
        dataTable.Rows.Add(dr);
    }

    //线条1：下限横线  
    Series seriesMin = new Series("最小值");
    seriesMin.ChartType = SeriesChartType.Line;
    seriesMin.BorderWidth = 1;
    seriesMin.ShadowOffset = 0;
    seriesMin.IsVisibleInLegend = true;
    seriesMin.IsValueShownAsLabel = false;
    seriesMin.Color = Color.Red;
    seriesMin.XValueType = ChartValueType.DateTime;
    seriesMin.MarkerStyle = MarkerStyle.None;
    chart.Series.Add(seriesMin);

    //线条3：上限横线  
    Series seriesMax = new Series("最大值");
    seriesMax.ChartType = SeriesChartType.Line;
    seriesMax.BorderWidth = 1;
    seriesMax.ShadowOffset = 0;
    seriesMax.IsVisibleInLegend = true;
    seriesMax.IsValueShownAsLabel = false;
    seriesMax.Color = Color.Red;
    seriesMax.XValueType = ChartValueType.DateTime;
    seriesMax.MarkerStyle = MarkerStyle.None;
    chart.Series.Add(seriesMax);

    //设置X轴的最小值为第一个点的X坐标值  
    //chartArea.AxisX.Minimum = Convert.ToDateTime(dataTable.Rows[0]["TheTime"]).ToOADate();

    //开始画线  
    foreach (DataRow dr in dataTable.Rows)
    {
        tempSeries.Points.AddXY(dr["TheTime"], dr["TheValue"]);

        seriesMin.Points.AddXY(dr["TheTime"], 15); //设置下线为15  
        seriesMax.Points.AddXY(dr["TheTime"], 30); //设置上限为30  
    }
}
```

**END……**