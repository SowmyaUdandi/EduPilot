from flask import Blueprint, send_file
from openpyxl import Workbook
from io import BytesIO

from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph
)
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

from models.history import History

export_bp = Blueprint("export", __name__)


# =====================================================
# EXPORT EXCEL
# =====================================================

@export_bp.route("/api/export/excel", methods=["GET"])
def export_excel():

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Prediction History"

    sheet.append([
        "ID",
        "Student",
        "Predicted Marks",
        "Risk",
        "Date"
    ])

    history = History.query.all()

    for item in history:

        student_name = (
            item.student.full_name
            if item.student
            else "Unknown"
        )

        sheet.append([
            item.id,
            student_name,
            item.predicted_marks,
            item.prediction_risk,
            item.created_at.strftime("%Y-%m-%d")
        ])

    output = BytesIO()
    workbook.save(output)
    output.seek(0)

    return send_file(
        output,
        as_attachment=True,
        download_name="Prediction_History.xlsx",
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


# =====================================================
# EXPORT PDF
# =====================================================

@export_bp.route("/api/export/pdf", methods=["GET"])
def export_pdf():

    history = History.query.all()

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    elements = []

    title = Paragraph(
        "<b>EduPilot Prediction History Report</b>",
        styles["Title"]
    )

    elements.append(title)

    data = [[
        "ID",
        "Student",
        "Marks",
        "Risk",
        "Date"
    ]]

    for item in history:

        student_name = (
            item.student.full_name
            if item.student
            else "Unknown"
        )

        data.append([
            str(item.id),
            student_name,
            str(item.predicted_marks),
            item.prediction_risk,
            item.created_at.strftime("%Y-%m-%d")
        ])

    table = Table(data)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.blue),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
    ]))

    elements.append(table)

    doc.build(elements)

    buffer.seek(0)

    return send_file(
        buffer,
        as_attachment=True,
        download_name="Prediction_History.pdf",
        mimetype="application/pdf"
    )