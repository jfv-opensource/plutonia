# Pylint rules
# pylint: disable=unused-argument

"""_summary_
"""

from datetime import datetime

def signature():
    """
    Doc
    """
    return  { 'date': date }

def date() -> str:
    """
    Return the current date in Paris

    Args:
      None

    Returns:
      current date (Paris)
    """

    current_date = datetime.now().strftime("%Y-%m-%d")

    return current_date
